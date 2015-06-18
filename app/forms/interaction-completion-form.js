import Ember from 'ember';
import EmberValidations from 'ember-validations';
import PromiseController from 'phoenix/controllers/promise';
import notify from 'phoenix/helpers/notify';

const qualityOptionsMapping = {
  'good': 'Good',
  'bad': 'Bad'
};

const qualityOptions = ['good', 'bad'];

export default Ember.ObjectProxy.extend(EmberValidations.Mixin, {
  requestPromise: null,

  init: function() {
    this._super.apply(this, arguments);

    this.get('content').set('quality', 'good');
  },

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

  save: function() {
    if (this.get('isValid')) {
      var requestPromise = PromiseController.create({
        promise: this.get('content').save().catch(function() {
          notify('There has been an error completing the interaction.', 'error');
        })
      });

      this.set('requestPromise', requestPromise);

      return requestPromise;
    } else {
      return Ember.RSVP.Promise.reject('Completion form validation failed');
    }
  }
});
