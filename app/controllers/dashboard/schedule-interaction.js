import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';
import TimeZoneOption from 'phoenix/models/as-calendar/time-zone-option';
import Occurrence from 'phoenix/models/as-calendar/occurrence';
import PromiseController from 'phoenix/controllers/promise';
import { request } from 'ic-ajax';

var InteractionOccurrence = Occurrence.extend({
  interaction: null,
  duration: moment.duration(60, 'minute'),
  scheduledCallTime: Ember.computed.alias('interaction.scheduledCallTime'),
  title: 'Scheduled Call',

  time: function(key, value) {
    if (arguments.length > 1) {
      if (value != null) {
        this.set('scheduledCallTime', value.toDate());
      } else {
        this.set('scheduledCallTime', null);
      }
    }

    var scheduledCallTime = this.get('scheduledCallTime');

    if (scheduledCallTime != null) {
      return moment(this.get('scheduledCallTime'));
    } else {
      return null;
    }
  }.property('scheduledCallTime')
});

export default Ember.ObjectController.extend(ModelsNavigationMixin, EmberValidations.Mixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],
  requestPromise: null,

  occurrences: function() {
    return this.get('unavailabilities').map(function(unavailability) {
      return Occurrence.create({
        type: 'alpha-call',
        time: moment(unavailability.get('startsAt')),
        endingTime: moment(unavailability.get('endsAt'))
      })
    });
  }.property('unavailabilities.@each.{startsAt,endsAt}'),

  occurrence: function() {
    return InteractionOccurrence.create({ interaction: this });
  }.property(),

  timeZoneOptions: function() {
    var timeZoneOptions = [];
    var advisorTimeZone = this.get('advisor.timeZone');
    var clientTimeZone = this.get('clientContact.timeZone');

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
  }.property('advisor.timeZone', 'clientContact.timeZone'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    cancel: function() {
      var requestPromise = PromiseController.create({
        promise: request({
          url: `${EmberENV.apiBaseUrl}/interests/${this.get('model.id')}`,
          type: 'DELETE'
        }).then(response => {
          this.store.pushPayload(response);

          new Messenger().post({
            message: "The interaction has been cancelled.",
            type: 'success',
            showCloseButton: true
          });

          this.get('sidePanel').send('close');
        }, () => {
          new Messenger().post({
            message: "The interaction could not be cancelled.",
            type: 'error',
            showCloseButton: true
          });
        })
      });

      this.set('requestPromise', requestPromise);
    },

    submit: function() {
      var advisorName = this.get('advisor.name');
      var clientName = this.get('clientContact.name');

      this.get('model').setProperties({
        scheduledCallTime: this.get('scheduledCallTime'),
        interactionType: 'call'
      }).save().then(function() {
        new Messenger().post({
          message: `An interaction between ${advisorName} and ${clientName} has been scheduled.`,
          type: 'success',
          showCloseButton: true
        });
      }, function() {
        new Messenger().post({
          message: `There has been an error scheduling the interaction.`,
          type: 'error',
          showCloseButton: true
        });
      });
    }
  },

  validations: {
    interactionType: {
      presence: true
    }
  },

  interactionTypes: [
    { id: 'call', name: 'One-on-One Call' },
    { id: 'half_hour_call', name: 'Half-Hour Call' },
    { id: 'hosted_call', name: 'Hosted Call' }
  ],

  speakDialInCountries: [
    { id: 'HK', name: 'Hong Kong' },
    { id: 'US', name: 'United States' },
    { id: 'UK', name: 'United Kingdom' }
  ],

  yesNo: [
    { id: true, name: 'Yes'}, { id: false, name: 'No' }
  ]
});
