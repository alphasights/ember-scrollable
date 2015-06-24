import Ember from 'ember';
import EmberValidations from 'ember-validations';
import PromiseController from 'phoenix/controllers/promise';
import phoneCountryCodes from 'phoenix/models/phone-country-codes';
import localMoment from 'phoenix/helpers/local-moment';
import notify from 'phoenix/helpers/notify';

export default Ember.ObjectProxy.extend(EmberValidations.Mixin, {
  interactionTypes: null,
  interactionClassifications: null,
  speakDialInCountries: null,
  selectedTimeZone: null,
  phoneCountryCodes: phoneCountryCodes,

  requestPromise: null,

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

    dialInOptions.unshift({ id: null, name: 'Do Not Use Speak' });
    return dialInOptions;
  }),

  save: function() {
    if (this.get('isValid')) {
      var model = this.get('content');
      var speakCountryCode = this.get('clientAccessNumberCountry');

      model.setProperties({
        clientAccessNumberCountry: speakCountryCode,
        speak: speakCountryCode ? true : false
      });

      var requestPromise = PromiseController.create({
        promise: this.get('content').save().catch(function() {
          notify('There has been an error scheduling the interaction.', 'error');
        })
      });

      this.set('requestPromise', requestPromise);

      return requestPromise;
    } else {
      return Ember.RSVP.Promise.reject('Form validation failed');
    }
  }
});
