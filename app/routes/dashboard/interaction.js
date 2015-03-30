import Ember from 'ember';
import SidePanelRouteMixin from 'phoenix/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return this.store.find('interaction', params.interaction_id);
  }
});
