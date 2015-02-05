import DS from 'ember-data';
import moment from 'ember-moment/helpers/moment';

export default DS.Transform.extend({
  serialize: function(value) {
    return value ? moment.utc(value) : null;
  },

  deserialize: function(value) {
    return value ? moment(value) : null;
  }
});
