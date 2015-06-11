import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':expandable-list'],

  displayList: false,
  title: null,

  actions: {
    toggleDisplay: function() {
      this.toggleProperty('displayList');
    }
  }
});
