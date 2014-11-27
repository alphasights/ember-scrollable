import Ember from 'ember';
import config from '../config/environment';

var initialized = false;

export default {
  name: 'errors',

  initialize: function() {
    if (initialized) { return; }

    Ember.RSVP.on('error', function(error) {
      Ember.onerror(error);
    });

    Ember.onerror = function(error) {
      if(error.status >= 500) {
        new Messenger().post({
          message: 'Something went wrong with that request, please try again.',
          type: 'error',
          showCloseButton: true
        });
      }

      Raven.captureException(error, {
        environment: config.environment
      });

      console.error(error);
    };

    initialized = true;
  }
};
