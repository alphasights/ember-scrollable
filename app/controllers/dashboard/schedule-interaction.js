import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';
import TimeZoneOption from 'phoenix/components/as-calendar/time-zone-option';
import Occurrence from 'phoenix/components/as-calendar/occurrence';

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

    return moment(this.get('scheduledCallTime'));
  }.property('scheduledCallTime')
});

var PersonTimeZoneOption = TimeZoneOption.extend({
  person: null,
  value: Ember.computed.oneWay('person.timeZone'),

  abbreviation: function() {
    return moment().tz(this.get('value')).format('z');
  }.property('value')
});

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],

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
    if (this.get('scheduledCallTime') != null) {
      return InteractionOccurrence.create({ interaction: this });
    } else {
      return null;
    }
  }.property('scheduledCallTime'),

  timeZoneOptions: function() {
    var timeZoneOptions = [];
    var advisor = this.get('advisor');
    var clientContact = this.get('clientContact');

    if (advisor.get('timeZone') != null) {
      timeZoneOptions.push(PersonTimeZoneOption.create({
        person: advisor,
        title: 'Advisor Time Zone'
      }));
    }

    if (clientContact.get('timeZone') != null) {
      timeZoneOptions.push(PersonTimeZoneOption.create({
        person: clientContact,
        title: 'Client Time Zone'
      }));
    }

    return timeZoneOptions;
  }.property('advisor.timeZone', 'clientContact.timeZone'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
