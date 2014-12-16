import Ember from 'ember';
import config from '../../config/environment';

export default Ember.ObjectController.extend({
  pistachioUrl: function() {
    return `${config.APP.pistachioUrl}/projects/${this.get('id')}`;
  }.property('id')
});
