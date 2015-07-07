import Ember from 'ember';
import EmberValidations from 'ember-validations';
import PromiseController from 'phoenix/controllers/promise';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  requestPromise: null,

  init: function() {
    if (this.setDefaultValues !== undefined) {
      this.setDefaultValues();
    }
    this._super.apply(this, arguments);
  },

  save: function() {
    if (this.get('isValid')) {
      this.setPersistedValues();

      var requestPromise = PromiseController.create({
        promise: this.get('model').save().catch(() => {
          if (this.get('model.errors.length') > 0) {
            this.set('errors', this.get('model.errors'));
          } else {
            notify(this.get('genericErrorMessage'), 'error');
          }

          return Ember.RSVP.Promise.reject();
        })
      });

      this.set('requestPromise', requestPromise);

      return requestPromise;
    } else {
      return Ember.RSVP.Promise.reject('Form validation failed');
    }
  }
});
