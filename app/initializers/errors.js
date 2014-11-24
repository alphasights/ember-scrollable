import Ember from 'ember';
import config from '../config/environment';

var initialized = false;

export default {
  name: 'errors',

  initialize: function(container) {
    if (initialized) { return; }

    Ember.RSVP.on('error', function(error) {
      Ember.onerror(error);
    });

    Ember.onerror = function(error) {
      if(error.jqXHR != null) {
        new Messenger().post({
          message: 'Something went wrong with that request, please try again.',
          type: 'error',
          showCloseButton: true
        });
      }

      var applicationController, currentRoute;

      try {
        applicationController = container.lookup('controller:application');
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
