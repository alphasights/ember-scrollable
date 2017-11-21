/* eslint no-console: 0 */

import Ember from 'ember';

export default Ember.Controller.extend({
  isShort: true,
  actions: {
    log(message) {
      console.log(message);
    },
    toggleHeight() {
      this.toggleProperty('isShort');
    }
  }
});
