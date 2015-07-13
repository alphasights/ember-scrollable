import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Labs',

  model: function() {
    return this.store.find('feature');
  }
});
