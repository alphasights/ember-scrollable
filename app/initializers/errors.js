import Ember from 'ember';
import logError from '../log-error';

export default {
  name: 'errors',

  initialize: _(function() {
    Ember.RSVP.off('error', Ember.RSVP.onerrorDefault);

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
          message: "Something went wrong with that request, please try again.",
          type: 'error',
          showCloseButton: true
        });
      }

      logError(error);
    };
  }).once()
};
