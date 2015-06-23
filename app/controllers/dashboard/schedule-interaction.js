import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import TimeZoneOption from 'phoenix/models/as-calendar/time-zone-option';
import Occurrence from 'phoenix/models/as-calendar/occurrence';
import PromiseController from 'phoenix/controllers/promise';
import phoneCountryCodes from 'phoenix/models/phone-country-codes';
import localMoment from 'phoenix/helpers/local-moment';
import notify from 'phoenix/helpers/notify';
import InteractionCancellation from 'phoenix/services/interaction-cancellation';

var InteractionOccurrence = Occurrence.extend({
  interaction: null,
  scheduledCallTime: Ember.computed.alias('interaction.scheduledCallTime'),
  interactionType: Ember.computed.oneWay('interaction.interactionType'),
  title: 'Scheduled Call',

  time: Ember.computed('scheduledCallTime', {
    set: function(_, value) {
      if (value != null) {
        this.set('scheduledCallTime', value.toDate());
      } else {
        this.set('scheduledCallTime', null);
      }

      return value;
    },

    get: function() {
      var scheduledCallTime = this.get('scheduledCallTime');

      if (scheduledCallTime != null) {
        return moment(scheduledCallTime);
      } else {
        return null;
      }
    }
  }),

  duration: Ember.computed('interactionType', function() {
    if (this.get('interactionType') === 'half_hour_call') {
      return moment.duration(30, 'minute');
    } else {
      return moment.duration(60, 'minute');
    }
  })
});

var UnavailabilityOccurrence = Occurrence.extend({
  unavailability: null,
  title: Ember.computed.oneWay('unavailability.title'),
  day: Ember.computed.oneWay('unavailability.day'),

  type: Ember.computed('unavailability.type', function() {
    return this.get('unavailability.type').dasherize();
  }),

  time: Ember.computed('unavailability.startsAt', function() {
    return moment(this.get('unavailability.startsAt'));
  }),

  endingTime: Ember.computed('unavailability.endsAt', function() {
    return moment(this.get('unavailability.endsAt'));
  }),

  duration: Ember.computed('endingTime', 'time', function() {
    return moment.duration(this.get('endingTime').diff(this.get('time')));
  })
});

export default Ember.Controller.extend(ModelsNavigationMixin, EmberValidations.Mixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],
  requestPromise: null,
  phoneCountryCodes: phoneCountryCodes,
  selectedTimeZone: null,

  formattedScheduledCallTime: Ember.computed('scheduledCallTime', 'selectedTimeZone', function() {
    var scheduledCallTime = this.get('scheduledCallTime');

    if (scheduledCallTime != null) {
      return localMoment(scheduledCallTime, this.get('selectedTimeZone'), 'D MMM, h:mm A');
    } else {
      return null;
    }
  }),

  visibleUnavailabilities: Ember.computed(
    'unavailabilities.@each.{interactionId}',
    'model.id',
    function() {
      return this.get('unavailabilities').filter((unavailability) => {
        return parseInt(unavailability.get('interactionId'), 10) === parseInt(this.get('model.id'), 10);
      });
    }
  ),

  unavailabilityOccurrences: Ember.computed('visibleUnavailabilities.[]', function() {
    return this.get('visibleUnavailabilities').map(function(unavailability) {
      return UnavailabilityOccurrence.create({ unavailability: unavailability });
    });
  }),

  occurrence: Ember.computed(function() {
    return InteractionOccurrence.create({ interaction: this });
  }),

  timeZoneOptions: Ember.computed('model.advisor.timeZone', 'model.clientContact.timeZone', function() {
    var timeZoneOptions = [];
    var advisorTimeZone = this.get('model.advisor.timeZone');
    var clientTimeZone = this.get('model.clientContact.timeZone');

    if (advisorTimeZone != null) {
      timeZoneOptions.push(TimeZoneOption.create({
        value: advisorTimeZone,
        title: 'Advisor Time Zone'
      }));
    }

    if (clientTimeZone != null) {
      timeZoneOptions.push(TimeZoneOption.create({
        value: clientTimeZone,
        title: 'Client Time Zone'
      }));
    }

    return timeZoneOptions;
  }),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    cancel: function() {
      var requestPromise =
        InteractionCancellation.create().cancel(this.get('model'), response => {
          this.store.pushPayload(response);
          this.get('dashboard').propertyDidChange('interactionsToSchedule');
          notify('The interaction has been cancelled.');
          this.get('sidePanel').send('close');
        });

      this.set('requestPromise', requestPromise);
    },

    submit: function() {
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

      if (this.get('isValid')) {
        this.set('requestPromise', PromiseController.create({
          promise: model.save().then(
            this.modelDidSave.bind(this),
            this.modelDidError.bind(this)
          )
        }));
      }
    }
  },

  modelDidSave: function() {
    var advisorName = this.get('model.advisor.name');
    var clientName = this.get('model.clientContact.name');

    this.get('dashboard').propertyDidChange('interactionsToSchedule');
    this.get('dashboard').propertyDidChange('scheduledInteractions');
    notify(`An interaction between ${advisorName} and ${clientName} has been scheduled.`);
  },

  modelDidError: function() {
    if (this.get('model.errors.length') > 0) {
      this.set('errors', this.get('model.errors'));
    } else {
      notify('There has been an error scheduling the interaction.', 'error');
    }
  },

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

  speakDialIns: Ember.computed('speakDialInCountries', function() {
    var dialInCountries = this.get('speakDialInCountries');

    var dialInOptions = _.map(dialInCountries, function(country, countryCode) {
      return { id: countryCode, name: country };
    });

    dialInOptions.unshift({ id: null, name: 'Do Not Use Speak' });
    return dialInOptions;
  })
});
