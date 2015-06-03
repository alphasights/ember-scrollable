import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':email-correspondence'],

  emails: null,
  displayList: false,

  actions: {
    toggleDisplay: function() {
      this.toggleProperty('displayList');
    }
  }
});
