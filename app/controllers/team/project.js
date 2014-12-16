import Ember from 'ember';
import config from '../../config/environment';

export default Ember.ObjectController.extend({
  progress: function() {
    var deliveryTarget = this.get('deliveryTarget');

    if (deliveryTarget === 0) {
      return 0;
    } else {
      return this.get('deliveredAdvisorsCount') / deliveryTarget;
    }
  }.property('deliveredAdvisorsCount', 'deliveryTarget'),

  members: function() {
    return _(this.get('model.members')).without(this.get('lead'));
  }.property('model.members.[]'),

  pistachioProjectUrl: function() {
    return `${config.APP.pistachioUrl}/projects/${this.get('id')}`;
  }.property('id')
});
