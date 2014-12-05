import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  identifyUserOnSegment: function() {
    var jsonModel = this.get('model').toJSON();
    jsonModel['handle'] = this.get('model.initials');

    analytics.identify(jsonModel);
  }.observes('model')
});
