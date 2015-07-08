import Ember from 'ember';
import Form from 'phoenix/forms/form';

const qualityOptionsMapping = {
  'good': 'Good',
  'bad': 'Bad'
};

const qualityOptions = qualityOptionsMapping.keys;

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

const speakQualityOptions = speakQualityOptionsMapping.keys;

export default Form.extend({
  genericErrorMessage: 'There has been an error completing the interaction.',
  speakExplanationNeeded: Ember.computed.equal('speakQuality', 'other'),
  editingDisabled: false,

  setDefaultValues: function() {
    if (this.get('model.id')) {
      this.set('editingDisabled', true);
    }
    this.set('duration', this.get('model.duration'));
    if (Ember.isPresent(this.get('model.quality'))) {
      this.set('quality', this.get('model.quality'));
    } else {
      this.set('quality', 'good');
    }
    this.set('interactionType', this.get('model.interaction.interactionType'));
    this.set('speakQuality', this.get('model.speakQuality'));
    this.set('speakExplanation', this.get('model.speakExplanation'));
  },

  setPersistedValues: function() {
    var model = this.get('model');

    model.setProperties({
      duration: this.get('duration'),
      quality: this.get('quality'),
      interactionType: this.get('interactionType'),
      speakQuality: this.get('speakQuality'),
      speakExplanation: this.get('speakExplanation')
    });
  },

  validations: {
    duration: {
      numericality: { onlyInteger: true, greaterThanOrEqualTo: 0 }
    },

    quality: {
      presence: true,
      inclusion: { in: qualityOptions }
    },

    speakQuality: {
      presence: true,
      inclusion: { in: speakQualityOptions }
    },

    speakExplanation: {
      presence: {
        'if': function(object) {
          return object.get('speakExplanationNeeded');
        }
      }
    },

    interactionType: {
      presence: true
    }
  },

  qualityOptionsForSelect: Ember.computed(function() {
    return _.map(qualityOptionsMapping, function(value, key) {
      return Ember.Object.create({
        id: key,
        name: value
      });
    });
  }),

  speakQualityOptionsForSelect: Ember.computed(function() {
    return _.map(speakQualityOptionsMapping, function(value, key) {
      return Ember.Object.create({
        id: key,
        name: value
      });
    });
  })
});
