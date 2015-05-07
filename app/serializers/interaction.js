import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serializeBelongsTo: function(snapshot, json, relationship) {
    if (!['primaryContact'].contains(relationship.key)) {
      this._super(snapshot, json, relationship);
    }
  }
});
