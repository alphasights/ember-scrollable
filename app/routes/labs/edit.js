import Ember from 'ember';
import FeatureForm from 'phoenix/forms/feature-form';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  titleToken: 'Edit Lab',
  currentUser: Ember.inject.service(),

  beforeModel: function() {
    if (this.get('currentUser.model.developer') !== true) {
      this.transitionTo('labs');
    }
  },

  model: function(params) {
    return Ember.RSVP.hash({
      badges: request(`${EmberENV.apiBaseUrl}/badges`),
      feature: this.store.find('feature', params.feature_id)
    });
  },

  setupController: function(controller, models) {
    controller.setProperties({
      model: models.feature,
      featureForm: FeatureForm.create({
        model: models.feature,
        container: this.get('container'),
        badges: models.badges.badges,
        features: this.controllerFor('labs').get('model')
      }),
    });
  }
});
