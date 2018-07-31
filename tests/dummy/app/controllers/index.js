/* eslint no-console: 0 */

import Controller from '@ember/controller';

export default Controller.extend({
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
