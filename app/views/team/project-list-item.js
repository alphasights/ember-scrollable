import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':project-list-item'],
  tagName: 'article',

  click: function(event) {
    // Prevent conflict with Foundation dropdown events

    if (this.$('.dropdown').has(Ember.$(event.target)).length === 0) {
      this.get('controller').send('show');
    }
  }
});
