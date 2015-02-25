import Ember from 'ember';

export default Ember.ObjectController.extend({
  interaction: Ember.computed.alias('parentController'),

  callTime: function() {
    return moment
      .tz(this.get('interaction.scheduledCallTime'), this.get('person.timeZone'))
      .format('h:mm A z');
  }.property('interaction.scheduledCallTime', 'person.timeZone')
});
