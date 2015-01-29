import Ember from 'ember';
import ProjectProgress from '../../../mixins/project-progress';

export default Ember.ObjectController.extend(ProjectProgress, {
  needs: ['teams/team'],

  team: Ember.computed.alias('controllers.teams/team'),
  hasDeliveryTarget: Ember.computed.gt('deliveryTarget', 0),

  members: function() {
    return _(this.get('model.members')).without(this.get('lead'));
  }.property('model.members.[]'),

  actions: {
    show: function() {
      this.transitionToRoute('teams.team.project', this.get('team.id'), this.get('id'));
    }
  }
});
