import Ember from 'ember';

export function extractNameFromEmail(rawEmailAddress) {
  return rawEmailAddress.toString().replace(/<\S*>/, '').trim();
}

export default Ember.HTMLBars.makeBoundHelper(extractNameFromEmail);
