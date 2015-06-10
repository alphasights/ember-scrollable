import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  currentUser: Ember.inject.service(),

  model: function(params) {
    return Ember.RSVP.hash({
      unusedAdvisor: this.store.find('unusedAdvisor', params.unused_advisor_id),
      emailTemplates: this.store.find('emailTemplate')
    });
  },

  setupController: function(controller, models) {
    controller.set('email', this.store.createRecord('email', {
      recipients: models.unusedAdvisor.get('defaultEmail'),
      from: this.get('currentUser.email')
    }));

    controller.set('model', models.unusedAdvisor);
    controller.set('emailTemplates', models.emailTemplates);
  }
});
