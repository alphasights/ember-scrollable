import Ember from 'ember';
import EmberValidations from 'ember-validations';
import PromiseController from 'phoenix/controllers/promise';

const qualityOptionsMapping = {
  'good': 'Good',
  'bad': 'Bad'
};

const qualityOptions = ['good', 'bad'];

export default Ember.ObjectProxy.extend(EmberValidations.Mixin, {
  requestPromise: null,

  validations: {
    duration: {
      numericality: { onlyInteger: true, greaterThanOrEqualTo: 0 }
    },

    quality: {
      inclusion: { in: qualityOptions }
    },

    interactionType: {
      presence: true
    }
  },

  qualityOptions: Ember.computed(function() {
    return qualityOptions.map(function(option) {
      return Ember.Object.create({
        id: option,
        name: qualityOptionsMapping[option]
      });
    });
  }),

  save: function(resolve, reject) {
    if (this.get('isValid')) {
      var requestPromise = PromiseController.create({
        promise: this.get('content').save()
      })

      this.set('requestPromise', requestPromise);

      return requestPromise;
    } else {
      return Promise.reject();
    }
  }
});
