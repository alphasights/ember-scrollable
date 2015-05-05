import Ember from 'ember';
import ProjectProgressMixin from 'phoenix/mixins/project-progress';

export default Ember.ObjectController.extend(ProjectProgressMixin, {
  needs: ['whiteboards/whiteboard'],

  team: Ember.computed.oneWay('controllers.whiteboards/whiteboard'),
  hasDeliveryTarget: Ember.computed.gt('model.deliveryTarget', 0),

  nonLeadMembers: Ember.computed('model.members.[]', function() {
    return _(this.get('model.members')).without(this.get('model.lead'));
  }),

  actions: {
    show: function() {
      this.transitionToRoute('whiteboards.whiteboard.project', this.get('team.id'), this.get('id'));
    }
  }
});
