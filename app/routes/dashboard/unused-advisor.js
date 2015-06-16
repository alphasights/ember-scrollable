import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  currentUser: Ember.inject.service(),

  titleToken: function(models) {
    let advisorName = models.unusedAdvisor.get('advisor.name');

    return `Unused Advisor: ${advisorName}`;
  },

  model: function(params) {
    return this.store.find('unusedAdvisor', params.unused_advisor_id).then((unusedAdvisor) => {
      return Ember.RSVP.hash({
        unusedAdvisor: unusedAdvisor,
        emailTemplates: this.store.find('emailTemplate'),
        projectHistory: this.store.find('projectHistory', { advisor_id: unusedAdvisor.get('advisor.id') })
      });
    });
  },

  setupController: function(controller, models) {
    controller.set('email', this.store.createRecord('email', {
      concerningId: models.unusedAdvisor.get('id'),
      recipients: models.unusedAdvisor.get('defaultEmail'),
      from: this.get('currentUser.email')
    }));

    controller.set('model', models.unusedAdvisor);
    controller.set('emailTemplates', models.emailTemplates);
    controller.set('model', models.unusedAdvisor);
    controller.set('projectHistory', models.projectHistory);
  }
});
