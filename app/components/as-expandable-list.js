import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':expandable-list', 'titleClass'],

  showContent: false,
  title: null,

  titleClass: Ember.computed('title', function() {
    return this.get('title').toLowerCase().dasherize();
  }),

  actions: {
    toggleContent: function() {
      this.toggleProperty('showContent');
    }
  }
});
