/* eslint no-console: 0 */

import Controller from '@ember/controller';

export default Controller.extend({
  isShort: true,
  infiniteScrollItems: 20,
  infiniteScrollPage: 1,

  actions: {
    log(message) {
      console.log(message);
    },
    toggleHeight() {
      this.toggleProperty('isShort');
    },
    loadMore() {
      const items = ++this.infiniteScrollPage * 20;
      console.log(`Load up to ${items} items`);
      this.set('infiniteScrollItems', items);
    }
  }
});
