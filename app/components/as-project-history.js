import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':project-history'],

  projectHistory: null,
  displayList: false,

  actions: {
    toggleDisplay: function() {
      this.toggleProperty('displayList');
    }
  }
});
