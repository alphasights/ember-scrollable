import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  isNewSerializerAPI: true,

  serializeAttribute: function(record, json, key, attribute) {
    if (!['createdAt', 'updatedAt'].contains(attribute.name)) {
      this._super(record, json, key, attribute);
    }
  }
});
