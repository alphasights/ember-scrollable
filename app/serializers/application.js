import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serializeAttribute: function(record, json, key, attribute) {
    if (!['createdAt', 'updatedAt'].contains(attribute.name)) {
      this._super(record, json, key, attribute);
    }
  }
});
