import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  titleToken: 'Labs',

  model: function() {
    request(`${EmberENV.apiBaseUrl}/v1/features`).then(response => {
      this.store.pushPayload('feature', { feature: response.features });
      this.store.pushPayload('featureParticipations',
        { feature_participations: response.current_user_feature_participations }
      );
    });

    return this.store.all('feature');
  }
});
