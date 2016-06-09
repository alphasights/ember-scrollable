import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    log(message) {
      console.log(message);
    }
  }
});