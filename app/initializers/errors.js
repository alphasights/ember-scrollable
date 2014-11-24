import Ember from 'ember';
import config from '../config/environment';

var initialized = false;

export default {
  name: 'errors',

  initialize: function(container, application) {
    if (initialized) { return; }

    Ember.RSVP.on('error', function(error) {
      if (error.jqXHR != null) {
        new Messenger().post({
          message: 'Something went wrong with that request, please try again.',
          type: 'error',
          showCloseButton: true
        });
      } else {
        Ember.onerror(error);
      }
    });

    Ember.onerror = function(error) {
      var applicationController, currentRoute;

      try {
        applicationController = application.__container__.lookup('controller:application');
        currentRoute = applicationController.get('currentPath');
      } catch(e) {}

      Raven.captureException(error, {
        currentRoute: currentRoute,
        environment: config.environment
      });

      // without this line errors won't show up in the console
      console.error(error);
    };

    initialized = true;
  }
};
