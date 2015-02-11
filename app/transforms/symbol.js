import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(value) {
    if (value != null) {
      return value.underscore();
    } else {
      return value;
    }
  },

  deserialize: function(value) {
    if (value != null) {
      return value.camelize();
    } else {
      return value;
    }
  }
});
