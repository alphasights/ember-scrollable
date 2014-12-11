import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  identifyUserOnSegment: function() {
    var model = this.get('model');

    analytics.identify(model.get('initials'), _(model.toJSON()));
  }.observes('model')
});
