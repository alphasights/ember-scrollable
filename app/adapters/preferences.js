import DS from 'ember-data';

export default DS.LSAdapter.extend({
  shouldBackgroundReloadRecord: function() {
    return false;
  },

  shouldReloadAll: function() {
    return true;
  }
});
