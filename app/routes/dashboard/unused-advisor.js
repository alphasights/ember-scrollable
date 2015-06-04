import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return this.store.find('unusedAdvisor', params.unused_advisor_id);
  }
});
