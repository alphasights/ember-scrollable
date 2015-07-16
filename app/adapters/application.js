import { ActiveModelAdapter } from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  host: EmberENV.apiBaseUrl,

  shouldBackgroundReloadRecord: function() {
    return false;
  },

  shouldReloadAll: function() {
    return true;
  }
});
