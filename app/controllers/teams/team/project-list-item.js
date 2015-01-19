import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['teams/team'],

  team: Ember.computed.alias('controllers.teams/team'),
  hasDeliveryTarget: Ember.computed.gt('deliveryTarget', 0),

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

  actions: {
    show: function() {
      this.transitionToRoute('teams.team.project', this.get('team.model'), this.get('model'));
    }
  }
});
