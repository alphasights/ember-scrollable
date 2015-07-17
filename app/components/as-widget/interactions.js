import Ember from 'ember';
import ListWidgetComponent from 'phoenix/components/as-widget/list';

export default ListWidgetComponent.extend({
  classNameBindings: [':interactions'],

  interactionsWithIncompleteChecklistItems: Ember.computed.filterBy('arrangedContent', 'hasIncompleteChecklistItems', true),

  alert: Ember.computed('interactionsWithIncompleteChecklistItems.length', function() {
    let count = this.get('interactionsWithIncompleteChecklistItems.length');

    return `${count} ${count > 1 ? 'interactions have' : 'interaction has'} incomplete checklist items.`;
  }),

  displayAlert: Ember.computed('interactionsWithIncompleteChecklistItems.length', 'hasMoreItems', function() {
    return this.get('interactionsWithIncompleteChecklistItems.length') > 0 && this.get('hasMoreItems');
  })
});
