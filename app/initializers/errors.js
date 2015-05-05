import Ember from 'ember';
import logError from '../log-error';
import notify from 'phoenix/helpers/notify';

export default {
  name: 'errors',

  initialize: _(function() {
    if (EmberENV.logErrors == null || EmberENV.logErrors) {
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
          notify('Something went wrong with that request, please try again.', 'error');
        }

        logError(error);
      };
    }
  }).once()
};
