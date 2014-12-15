import Ember from 'ember';
import config from '../config/environment';

export default Ember.ObjectController.extend({
  preferences: null,

  modelDidChange: function() {
    if (config.APP.segmentWriteKey != null) {
      analytics.identify(this.get('initials'), _(this.get('model').toJSON()));
    }
  }.observes('model'),

  setupIntercom: function() {
    if (config.APP.intercomAppId != null) {
      /* jshint newcap: false */
      Intercom('boot', {
        app_id: config.APP.intercomAppId,
        email: this.get('email'),
        created_at: this.get('createdAt'),
        name: this.get('name'),
        user_id: this.get('id'),
        user_hash: this.get('intercomUserHash')
      });
      /* jshint newcap: true */
    }
  },

  actions: {
    boot: function() {
      this.setupIntercom();
    }
  }
});
