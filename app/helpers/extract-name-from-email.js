import Ember from 'ember';

export function extractNameFromEmail(rawEmailAddress) {
  var emailAddress = rawEmailAddress.toString();

  if (emailAddress.includes('<') && emailAddress.includes('>')) {
    return emailAddress.replace(/<\S*>/, '').trim();
  } else {
    return emailAddress;
  }
}

export default Ember.HTMLBars.makeBoundHelper(extractNameFromEmail);
