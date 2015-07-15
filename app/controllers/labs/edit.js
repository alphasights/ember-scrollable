import Ember from 'ember';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend({
  buttonText: 'Update Lab',
  formAction: 'update',

  actions: {
    update: function() {
      this.get('featureForm').save().then((featureForm) => {
        let featureName = featureForm.get('name');
        let verb = this.get('saveNotificationVerb');

        notify(`The feature, ${featureName}, has been updated.`);
        this.transitionToRoute('labs');
      });
    }
  }
});
