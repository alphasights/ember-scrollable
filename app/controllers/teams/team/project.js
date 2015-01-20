import Ember from 'ember';

export default Ember.ObjectController.extend({
  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('id')}`;
  }.property('id')
});
