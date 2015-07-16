import Ember from 'ember';
import ListWidgetComponent from 'phoenix/components/as-widget/list';

export default ListWidgetComponent.extend({
  classNameBindings: [':interactions'],
  
  interactionsWithIncompleteChecklistItems: Ember.computed.filterBy('arrangedContent', 'hasIncompleteChecklistItems', true),

  alert: Ember.computed('interactionsWithIncompleteChecklistItems.length', function() {
    let count = this.get('interactionsWithIncompleteChecklistItems.length');

    if (count > 0) {
      return `${count} ${count > 1 ? 'interactions' : 'interaction'} with an incomplete checklist in total`;
    } else {
      return '';
    }
  })
});
