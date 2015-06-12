import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';
import PaginatedRouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(SidePanelRouteMixin, PaginatedRouteMixin, {
  perPage: 10,

  titleToken: function(model) {
    let advisorName = model.unusedAdvisor.get('advisor.name');

    return `Unused Advisor: ${advisorName}`;
  },

  model: function(params) {
    return this.store.find('unusedAdvisor', params.unused_advisor_id).then((unusedAdvisor) => {
      let advisorEmails = unusedAdvisor.get('advisor.emails').join(',');

      return Ember.RSVP.hash({
        emails: this.findPaged('email', { emails: advisorEmails}),
        projectHistory: this.store.find('projectHistory', { advisor_id: unusedAdvisor.get('advisor.id') }),
        unusedAdvisor: unusedAdvisor
      });
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.unusedAdvisor);
    controller.set('emails', models.emails);
    controller.set('projectHistory', models.projectHistory);
  }
});
