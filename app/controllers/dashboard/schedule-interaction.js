import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import TimeZoneOption from 'phoenix/models/as-calendar/time-zone-option';
import Occurrence from 'phoenix/models/as-calendar/occurrence';
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
