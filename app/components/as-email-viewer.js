import Ember from 'ember';
import {
  extractNameFromEmail
} from 'phoenix/helpers/extract-name-from-email';

export default Ember.Component.extend({
  classNameBindings: [':email-viewer'],
  email: null,

  senderName: Ember.computed('email.from', function() {
    var from = this.get('email.from');

    if (Ember.isPresent(from.get('name'))) {
      return from.get('name');
    } else {
      return extractNameFromEmail(from.get('address'));
    }
  }),

  info: Ember.computed('email.from', 'email.sentAt', function() {
    let momentSentAt = moment(this.get('email.sentAt'));
    let dateSent = momentSentAt.format('D MMM');
    let timeAgo = momentSentAt.fromNow();

    return `Sent by ${this.get('senderName')} on ${dateSent} - ${timeAgo}`;
  })
});
