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
  interactionTypes: null,
  interactionClassifications: null,
  speakExplanationNeeded: Ember.computed.equal('speakQuality', 'other'),
  editingDisabled: false,

  setDefaultValues: function() {
    if (this.get('model.id') != null) {
      this.set('editingDisabled', true);
    }
    if (Ember.isPresent(this.get('model.quality'))) {
      this.set('quality', this.get('model.quality'));
    } else {
      this.set('quality', 'good');
    }
    this.set('duration', this.get('model.duration'));
    this.set('customCredits', this.get('model.customCredits'));
    this.set('customRevenue', this.get('model.customRevenue'));
    this.set('interactionType', this.get('model.interaction.interactionType'));
    this.set('speakQuality', this.get('model.speakQuality'));
    this.set('speakExplanation', this.get('model.speakExplanation'));
  },

  setPersistedValues: function() {
    let model = this.get('model');
    let customCredits = this.get('isCustomCredit') ? this.get('customCredits') : null;
    let customRevenue = this.get('isPriceBased') ? this.get('customRevenue') : null;
    let duration = this.get('isDurationBased') ? this.get('duration') : null;

    model.setProperties({
      customCredits: customCredits,
      customRevenue: customRevenue,
      duration: duration,
      interactionType: this.get('interactionType'),
      quality: this.get('quality'),
      speakQuality: this.get('speakQuality'),
      speakExplanation: this.get('speakExplanation')
    });
  },

  isDurationBased: Ember.computed('interactionType', 'interactionClassifications', function() {
    return this._isOfClassification('duration_based');
  }),

  isPriceBased: Ember.computed('interactionType', 'interactionClassifications', function() {
    return this._isOfClassification('non_credit');
  }),

  isCustomCredit: Ember.computed('interactionType', 'interactionClassifications', function() {
    return this._isOfClassification('custom_credit');
  }),

  requiresPdfConfirmation: Ember.computed('isCustomCredit', 'customCredits', function() {
    return this.get('isCustomCredit') && this.get('customCredits') > 4;
  }),

  interactionTypesForSelect: Ember.computed('interactionTypes', 'interactionClassifications', function() {
    var classifications = this.get('interactionClassifications');
    var interactionTypes = this.get('interactionTypes');

    var types = _.map(classifications, function(typeIds, classification) {
      return _.map(typeIds, function(typeId) {
        return {
          id: typeId,
          name: interactionTypes[typeId],
          classification: _.map(classification.split('_'), function(word){
            return word.capitalize();
          }).join(' ')
        };
      });
    });

    return _.flatten(types);
  }),

  _isOfClassification: function(classification) {
    let classifications = this.get('interactionClassifications');

    return classifications[classification].indexOf(this.get('interactionType')) > -1;
  },

  validations: {
    duration: {
      numericality: {
        'if': function(object) {
          return object.get('isDurationBased');
        },
        onlyInteger: true,
        greaterThanOrEqualTo: 0
      }
    },

    customCredits: {
      numericality: {
        'if': function(object) {
          return object.get('isCustomCredit');
        },
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 4
      }
    },

    customRevenue: {
      numericality: {
        'if': function(object) {
          return object.get('isPriceBased');
        },
        greaterThanOrEqualTo: 0
      }
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
