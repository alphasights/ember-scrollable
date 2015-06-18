export default {
  name: 'inject-store',
  after: 'store',
  initialize: function(container) {
    container.injection('service:currentUser', 'store', 'service:store');
    container.injection('service:preferences', 'store', 'service:store');
  }
};
