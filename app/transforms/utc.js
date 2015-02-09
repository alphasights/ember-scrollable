import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(value) {
    return value ? value.toJSON() : null;
  },

  deserialize: function(value) {
    return moment(value);
  }
});
