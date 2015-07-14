import Ember from 'ember';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend({
  actions: {
    createFeature: function() {
      this.get('featureForm').save().then((featureForm) => {
        let featureName = featureForm.get('name');

        notify(`The feature, ${featureName}, has been created.`);
        this.transitionToRoute('labs');
      });
    }
  }
});
