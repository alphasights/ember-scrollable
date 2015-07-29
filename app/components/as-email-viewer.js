import Ember from 'ember';
import {
  extractNameFromEmail
} from 'phoenix/helpers/extract-name-from-email';

export default Ember.Component.extend({
  classNameBindings: [':email-viewer'],
  email: null,

  senderName: Ember.computed('email.from', function() {
    var email = this.get('email');

    if (Ember.isPresent(email.get('from.name'))) {
      return email.get('from.name');
    } else {
      return extractNameFromEmail(email.get('from.address'));
    }
  }),

  info: Ember.computed('senderName', 'email.sentAt', function() {
    let momentSentAt = moment(this.get('email.sentAt'));
    let dateSent = momentSentAt.format('D MMM');
    let timeAgo = momentSentAt.fromNow();

    return `Sent by ${this.get('senderName')} on ${dateSent} - ${timeAgo}`;
  })
});
