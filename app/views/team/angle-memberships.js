import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':angle-memberships'],

  onSearchClick: function(event) {
    event.stopPropagation();
  }
});
