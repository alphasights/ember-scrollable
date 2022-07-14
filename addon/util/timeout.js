import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export function timeout(ms) {
  let promise = new Promise((r) => {
    later(r, ms);
  });
  return promise;
}
