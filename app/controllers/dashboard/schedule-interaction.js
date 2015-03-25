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
  scheduledCallTime: Ember.computed.oneWay('interaction.scheduledCallTime'),
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

  unavailabilities: [
    Occurrence.create({
      type: 'alpha-call',
      time: moment().startOf('week').add(10, 'hour'),
      duration: moment.duration(5, 'hour')
    }),

    Occurrence.create({
      type: 'alpha-call',
      time: moment().startOf('week').add(8, 'hour').add(3, 'day'),
      duration: moment.duration(2, 'hour')
    })
  ],

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
          Ember.run.next(() => {
            this.store.pushPayload(response);
            this.send('hideSidePanel');

            new Messenger().post({
              message: "The interaction has been cancelled.",
              type: 'success',
              showCloseButton: true
            });
          });
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

      new Messenger().post({
        message: `An interaction between ${advisorName} and ${clientName} has been scheduled.`,
        type: 'success',
        showCloseButton: true
      });
    }
  },

  validations: {
    speakDialIn: {
      presence: true,
      numericality: true
    },
    interactionType: {
      presence: true
    }
  },

  interactionTypes: [
    { id: 'call', name: 'One-on-One Call' },
    { id: 'half_hour_call', name: 'Half-Hour Call' },
    { id: 'hosted_call', name: 'Hosted Call' }
  ]

});
