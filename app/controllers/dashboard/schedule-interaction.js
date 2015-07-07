import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import TimeZoneOption from 'ember-calendar/models/time-zone-option';
import notify from 'phoenix/helpers/notify';
import InteractionCancellation from 'phoenix/services/interaction-cancellation';

var InteractionOccurrence = Ember.Object.extend({
  interaction: null,
  startsAt: Ember.computed.alias('interaction.scheduledCallTime'),
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
  }),

  endsAt: Ember.computed('startsAt', 'duration', function() {
    return moment(this.get('startsAt')).add(this.get('duration'));
  })
});

var UnavailabilityOccurrence = Ember.Object.extend({
  unavailability: null,
  title: Ember.computed.oneWay('unavailability.title'),
  day: Ember.computed.oneWay('unavailability.day'),
  startsAt: Ember.computed.oneWay('unavailability.startsAt'),
  endsAt: Ember.computed.oneWay('unavailability.endsAt'),

  type: Ember.computed('unavailability.type', function() {
    return this.get('unavailability.type').dasherize();
  })
});

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],
  requestPromise: null,

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

  occurrence: Ember.computed('scheduleInteractionForm', function() {
    return InteractionOccurrence.create({ interaction: this.get('scheduleInteractionForm') });
  }),

  timeZoneOptions: Ember.computed('model.advisor.timeZone', 'model.clientContact.timeZone', function() {
    var timeZoneOptions = [];
    var advisorTimeZone = this.get('model.advisor.timeZone');
    var clientTimeZone = this.get('model.clientContact.timeZone');

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
    option.set('label', `${label} (${option.get('abbreviation')})`);
    return option;
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
      this.get('occurrence').set('startsAt', occurrence.get('startsAt'));
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
