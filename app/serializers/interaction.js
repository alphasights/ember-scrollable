import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  isNewSerializerAPI: true,

  serializeBelongsTo: function(snapshot, json, relationship) {
    if (!['primaryContact'].contains(relationship.key)) {
      this._super(snapshot, json, relationship);
    }
  }
});
