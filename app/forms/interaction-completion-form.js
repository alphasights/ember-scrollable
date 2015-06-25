import Ember from 'ember';
import EmberValidations from 'ember-validations';
import PromiseController from 'phoenix/controllers/promise';

const qualityOptionsMapping = {
  'good': 'Good',
  'bad': 'Bad'
};

const qualityOptions = ['good', 'bad'];

const speakQualityOptionsMapping = {
  'no_known_issues': 'No known issues',
  'disconnected_10': 'Call disconnected: ≤10 mins',
  'disconnected_30': 'Call disconnected: 11 - 30 mins',
  'disconnected_60': 'Call disconnected: 31 - 60 mins',
  'poor_line_quality': 'Poor line quality identified by client or advisor',
  'breaking_up': 'Call broke up (jitter)',
  'lag': 'Voice lag or delay',
  'email_notification': 'Issues with email notifications',
  'advisor_not_dialed': 'Advisor not dialed',
  'other': 'Other issue'
};

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

  speakQualityOptions: Ember.computed(function() {
    return _.map(speakQualityOptionsMapping, function(value, key) {
      return Ember.Object.create({
        id: key,
        name: value
      });
    });
  }),

  save: function() {
    if (this.get('isValid')) {
      var requestPromise = PromiseController.create({
        promise: this.get('content').save()
      });

      this.set('requestPromise', requestPromise);

      return requestPromise;
    } else {
      return Ember.RSVP.Promise.reject('Completion form validation failed');
    }
  }
});
