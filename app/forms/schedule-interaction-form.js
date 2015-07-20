import Ember from 'ember';
import jstz from 'jstz';
import Form from 'phoenix/forms/form';
import phoneCountryCodes from 'phoenix/models/phone-country-codes';
import localMoment from 'phoenix/helpers/local-moment';
import SelectableInteractionTypesMixin from 'phoenix/mixins/selectable-interaction-types-form';

export default Form.extend(SelectableInteractionTypesMixin, {
  genericErrorMessage: 'There has been an error scheduling the interaction.',
  interactionTypes: null,
  interactionClassifications: null,
  speakDialInCountries: null,
  timeZone: jstz.determine().name(),
  phoneCountryCodes: phoneCountryCodes,
  dateFormat: 'D MMM, h:mm A',

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

  formattedScheduledCallTime: Ember.computed('scheduledCallTime', 'timeZone', {
    get: function() {
      var scheduledCallTime = this.get('scheduledCallTime');

      if (scheduledCallTime != null) {
        return localMoment(scheduledCallTime, this.get('timeZone'), this.get('dateFormat'));
      } else {
        return null;
      }
    },

    set: function(_, value) {
      return value;
    }
  }),

  setScheduledCallTime: function(string) {
    var result = moment.tz(string, this.get('dateFormat'), this.get('timeZone'));

    if (result.isValid()) {
      this.set('scheduledCallTime', result.toDate());
    } else {
      this._reloadValidScheduledCallTime();
    }
  },

  scheduledCallTimeLabel: Ember.computed('timeZone', function() {
    return `Call Time (${moment.tz(this.get('timeZone')).format('z')})`;
  }),

  speakDialIns: Ember.computed('speakDialInCountries', function() {
    var dialInCountries = this.get('speakDialInCountries');

    var dialInOptions = _.map(dialInCountries, function(country, countryCode) {
      return { id: countryCode, name: country };
    });

    return dialInOptions;
  }),

  _reloadValidScheduledCallTime: function() {
    this.notifyPropertyChange('formattedScheduledCallTime');
  }
});
