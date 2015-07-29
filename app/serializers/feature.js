import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  isNewSerializerAPI: true,

  serializeBelongsTo: function(snapshot, json, relationship) {
    if (relationship.key !== 'owner') {
      this._super(snapshot, json, relationship);
    }
  },

  serializeAttribute: function(record, json, key, attribute) {
    if (attribute.name !== 'featureParticipationsCount') {
      this._super(record, json, key, attribute);
    }
  }
});
