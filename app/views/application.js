import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':application', 'isDevelopment:dev-border'],

  isDevelopment: function() {
    return (_.contains(['development', 'test'], EmberENV.environment));
  }.property()
});
