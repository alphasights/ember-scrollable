import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  identifyUserOnSegment: function() {
    var model = this.get('model');

    analytics.identify(_(model.toJSON()).extend({
      handle: model.get('initials')
    }));
  }.observes('model')
});
