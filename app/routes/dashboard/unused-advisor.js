import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return this.store.find('unusedAdvisor', params.unused_advisor_id).then((unusedAdvisor) => {
      let advisorEmails = unusedAdvisor.get('advisor.emails').join(',');

      return Ember.RSVP.hash({
        unusedAdvisor: unusedAdvisor,
        emails: this.store.find('email', { emails: advisorEmails})
      });
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.unusedAdvisor);
    controller.set('emails', models.emails);
  }
});
