export default {
  name: 'inject-store',
  after: 'store',
  initialize: function(container) {
    container.injection('service:currentUser', 'store', 'store:main');
    container.injection('service:preferences', 'store', 'store:main');
  }
};
