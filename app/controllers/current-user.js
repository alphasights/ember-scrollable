import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  identifyUserOnSegment: function() {
    var model = this.get('model');

    analytics.identify(model.get('initials'), _(model.toJSON()));
  }.observes('model'),

  bootIntercom: function() {
    var model = this.get('model');

    new Intercom('boot', {
      app_id: '4rw4fi3l',
      email: model.get('email'),
      created_at: model.get('createdAt'),
      name: model.get('name'),
      user_id: model.get('id'),
      user_hash: model.get('intercomUserHash')
    });
  }.observes('model')
});
