import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':expandable-list', 'cssClass'],

  displayList: false,
  title: null,

  cssClass: Ember.computed('title', function() {
    return this.get('title').toLowerCase().dasherize();
  }),

  actions: {
    toggleDisplay: function() {
      this.toggleProperty('displayList');
    }
  }
});
