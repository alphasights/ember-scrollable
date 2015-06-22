import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  serializeAttribute: function(record, json, key, attribute) {
    if (!['createdAt', 'updatedAt'].contains(attribute.name)) {
      this._super(record, json, key, attribute);
    }
  }
});
