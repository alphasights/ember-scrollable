import Ember from 'ember';
import ProjectProgressMixin from 'phoenix/mixins/project-progress';

export default Ember.ObjectController.extend(ProjectProgressMixin, {
  needs: ['whiteboards/whiteboard'],

  whiteboard: Ember.computed.oneWay('controllers.whiteboards/whiteboard'),
  hasDeliveryTarget: Ember.computed.gt('model.deliveryTarget', 0),

  nonLeadMembers: Ember.computed('model.members.[]', function() {
    return _(this.get('model.members')).without(this.get('model.lead'));
  }),

  actions: {
    show: function() {
      this.transitionToRoute('whiteboards.whiteboard.project', this.get('whiteboard.id'), this.get('id'));
    }
  }
});
