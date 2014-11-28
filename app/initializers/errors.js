import Ember from 'ember';
import { logError } from '../errors';

var initialized = false;

export default {
  name: 'errors',

  initialize: function() {
    if (initialized) { return; }

    Ember.RSVP.on('error', function(error) {
      Ember.onerror(error);
    });

    Ember.onerror = function(error) {
      var status;

      if (error.jqXHR != null) {
        status = error.jqXHR.status;
      } else {
        status = error.status;
      }

      if (status >= 500) {
        new Messenger().post({
          message: 'Something went wrong with that request, please try again.',
          type: 'error',
          showCloseButton: true
        });
      }

      logError(error);
    };

    initialized = true;
  }
};
