import Ember from 'ember';

export default Ember.Object.extend({
  title: null,
  time: null,
  endingTime: null,

  duration: function() {
    return moment.duration(moment(this.get('endingTime')).diff(this.get('time')));
  }.property('time', 'endingTime')
});
