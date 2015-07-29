import Ember from 'ember';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend({
  buttonText: 'Create Lab',
  formAction: 'create',

  actions: {
    create: function() {
      this.get('featureForm').save().then((featureForm) => {
        let featureName = featureForm.get('name');

        notify(`The feature, ${featureName}, has been created.`);
        this.transitionToRoute('labs');
      });
    }
  }
});
