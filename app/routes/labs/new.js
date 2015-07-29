import Ember from 'ember';
import FeatureForm from 'phoenix/forms/feature-form';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),
  titleToken: 'New Lab',

  beforeModel: function() {
    if (this.get('currentUser.model.developer') !== true) {
      this.transitionTo('labs');
    }
  },

  model: function() {
    return Ember.RSVP.hash({
      badges: request(`${EmberENV.apiBaseUrl}/badges`),
      feature: this.store.createRecord('feature', {
        owner: this.get('currentUser.model')
      })
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
