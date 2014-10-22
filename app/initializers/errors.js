import Ember from 'ember';

export default {
  name: 'errors',

  initialize: function() {
    Ember.RSVP.on('error', function() {
      new Messenger().post({
        message: 'Sorry, but something went wrong.',
        type: 'error',
        showCloseButton: true
      });
    });
  }
};
