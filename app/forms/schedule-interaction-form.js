import Ember from 'ember';
import Form from 'phoenix/forms/form';
import phoneCountryCodes from 'phoenix/models/phone-country-codes';
import localMoment from 'phoenix/helpers/local-moment';

export default Form.extend({
  genericErrorMessage: 'There has been an error scheduling the interaction.',
  interactionTypes: null,
  interactionClassifications: null,
  speakDialInCountries: null,
  selectedTimeZone: null,
  phoneCountryCodes: phoneCountryCodes,

  validations: {
    interactionType: {
      presence: true
    },

    advisorPhoneNumber: {
      presence: true
    },

    scheduledCallTime: {
      presence: true
    }
  },

  setDefaultValues: function() {
    var model = this.get('model');

    if (Ember.isBlank(model.get('interactionType'))) {
      if (Ember.isPresent(model.get('project.defaultInteractionType'))) {
        this.set('interactionType', model.get('project.defaultInteractionType'));
      } else {
        this.set('interactionType', 'call');
      }
    } else {
      this.set('interactionType', model.get('interactionType'));
    }

    if (Ember.isBlank(model.get('advisorPhoneCountryCode'))) {
      this.set('advisorPhoneCountryCode', '1');
    } else {
      this.set('advisorPhoneCountryCode', model.get('advisorPhoneCountryCode'));
    }

    this.set('scheduledCallTime', model.get('scheduledCallTime'));
    this.set('advisorPhoneNumber', model.get('advisorPhoneNumber'));
    this.set('clientAccessNumberCountry', model.get('clientAccessNumberCountry'));
    this.set('additionalContactDetails', model.get('additionalContactDetails'));
  },

  setPersistedValues: function() {
    var model = this.get('model');
    var speakCountryCode = this.get('clientAccessNumberCountry');

    model.setProperties({
      scheduledCallTime: this.get('scheduledCallTime'),
      interactionType: this.get('interactionType'),
      advisorPhoneNumber: this.get('advisorPhoneNumber'),
      advisorPhoneCountryCode: this.get('advisorPhoneCountryCode'),
      clientAccessNumberCountry: speakCountryCode,
      additionalContactDetails: this.get('additionalContactDetails'),
      speak: speakCountryCode ? true : false
    });
  },

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

  formattedScheduledCallTime: Ember.computed('scheduledCallTime', 'selectedTimeZone', function() {
    var scheduledCallTime = this.get('scheduledCallTime');

    if (scheduledCallTime != null) {
      return localMoment(scheduledCallTime, this.get('selectedTimeZone'), 'D MMM, h:mm A');
    } else {
      return null;
    }
  }),

  speakDialIns: Ember.computed('speakDialInCountries', function() {
    var dialInCountries = this.get('speakDialInCountries');

    var dialInOptions = _.map(dialInCountries, function(country, countryCode) {
      return { id: countryCode, name: country };
    });

    return dialInOptions;
  })
});
