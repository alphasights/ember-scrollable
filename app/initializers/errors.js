import Ember from 'ember';

export default {
  name: 'errors',

  initialize: function() {
    Ember.RSVP.on('error', function() {
      new Messenger().post({
        message: 'Something went wrong with that request, please try again.',
        type: 'error',
        showCloseButton: true
      });
    });
  }
};
