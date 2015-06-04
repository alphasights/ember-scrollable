export default {
  name: 'inject-store',
  after: 'store',
  initialize: function(container) {
    container.injection('service:warden', 'store', 'store:main');
    container.injection('service:preferences', 'store', 'store:main');
  }
};
