import Ember from 'ember';
import jstz from 'jstz';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import TimeZoneOption from 'ember-calendar/models/time-zone-option';
import notify from 'phoenix/helpers/notify';
import InteractionCancellation from 'phoenix/services/interaction-cancellation';

var InteractionOccurrence = Ember.Object.extend({
  interaction: null,
  startsAt: Ember.computed.alias('interaction.scheduledCallTime'),
  interactionType: Ember.computed.oneWay('interaction.interactionType'),
  title: 'Scheduled Call',
  isSelection: true,

  duration: Ember.computed('interactionType', function() {
    if (this.get('interactionType') === 'half_hour_call') {
      return moment.duration(30, 'minute');
    } else {
      return moment.duration(60, 'minute');
    }
  }),

  endsAt: Ember.computed('startsAt', 'duration', {
    get: function() {
      return moment(this.get('startsAt')).add(this.get('duration')).toDate();
    },

    set: function(_, value) {
      return value;
    }
  })
});

var UnavailabilityOccurrence = Ember.Object.extend({
  unavailability: null,
  startsAt: Ember.computed.oneWay('unavailability.startsAt'),
  endsAt: Ember.computed.oneWay('unavailability.endsAt'),
  title: Ember.computed.oneWay('unavailability.title')
});

export default Ember.Controller.extend(ModelsNavigationMixin, {
  dashboard: Ember.inject.controller(),
  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],
  requestPromise: null,

  unavailabilityOccurrences: Ember.computed('visibleUnavailabilities.[]', function() {
    return this.get('visibleUnavailabilities').map(function(unavailability) {
      return UnavailabilityOccurrence.create({ unavailability: unavailability });
    });
  }),

  interactionOccurrence: Ember.computed('scheduleInteractionForm.scheduledCallTime', function() {
    var scheduleInteractionForm = this.get('scheduleInteractionForm');

    if (scheduleInteractionForm.get('scheduledCallTime') != null) {
      return InteractionOccurrence.create({ interaction: scheduleInteractionForm });
    } else {
      return null;
    }
  }),

  visibleUnavailabilities: Ember.computed(
    'unavailabilities.@each.{interactionId}',
    'model.id', function() {
      return this.get('unavailabilities').filter((unavailability) => {
        return parseInt(unavailability.get('interactionId'), 10) === parseInt(this.get('model.id'), 10);
      });
  }),

  occurrences: Ember.computed('interactionOccurrence', 'visibleUnavailabilities.[]', function() {
    var visibleUnavailabilities = this.get('visibleUnavailabilities');
    var interactionOccurrence = this.get('interactionOccurrence');

    if (interactionOccurrence != null) {
      return [interactionOccurrence].concat(visibleUnavailabilities);
    } else {
      return visibleUnavailabilities;
    }
  }),

  timeZoneOptions: Ember.computed('model.advisor.timeZone', 'model.clientContact.timeZone', function() {
    var timeZoneOptions = [];
    var advisorTimeZone = this.get('model.advisor.timeZone');
    var clientTimeZone = this.get('model.clientContact.timeZone');

    timeZoneOptions.push(this._buildTimeZoneOptionWithLabel(
      jstz.determine().name(),
      'Your Time Zone'
    ));

    if (advisorTimeZone != null) {
      timeZoneOptions.push(this._buildTimeZoneOptionWithLabel(
        advisorTimeZone,
        'Advisor Time Zone'
      ));
    }

    if (clientTimeZone != null) {
      timeZoneOptions.push(this._buildTimeZoneOptionWithLabel(
        clientTimeZone,
        'Client Time Zone'
      ));
    }

    return timeZoneOptions;
  }),

  _buildTimeZoneOptionWithLabel: function(timeZone, label) {
    var option = TimeZoneOption.create({ value: timeZone });
    option.set('description', `${label} (${option.get('abbreviation')})`);
    return option;
  },

  _validateOccurrenceProperties: function(properties) {
    return this.get('visibleUnavailabilities').every(function(occurrence) {
      return (properties.endsAt <= occurrence.get('startsAt') ||
             properties.startsAt >= occurrence.get('endsAt'));
    });
  },

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

    calendarAddOccurrence: function(occurrence) {
      if (this._validateOccurrenceProperties(occurrence.getProperties('startsAt', 'endsAt'))) {
        this.set('scheduleInteractionForm.scheduledCallTime', occurrence.get('startsAt'));
      }
    },

    calendarUpdateOccurrence: function(occurrence, properties) {
      if (this._validateOccurrenceProperties(properties)) {
        occurrence.setProperties(properties);
      }
    },

    calendarRemoveOccurrence: function() {
      this.get('occurrences').removeObject(this.get('interactionOccurrence'));

      Ember.run.next(() => {
        this.set('scheduleInteractionForm.scheduledCallTime', null);
      });
    },

    setScheduledCallTime: function(value) {
      this.get('scheduleInteractionForm').setScheduledCallTime(value);
    },

    scheduleInteraction: function() {
      this.get('scheduleInteractionForm').save().then(() => {
        var advisorName = this.get('model.advisor.name');
        var clientName = this.get('model.clientContact.name');

        this.get('dashboard').propertyDidChange('interactionsToSchedule');
        this.get('dashboard').propertyDidChange('scheduledInteractions');
        notify(`An interaction between ${advisorName} and ${clientName} has been scheduled.`);
      });
    }
  }
});
