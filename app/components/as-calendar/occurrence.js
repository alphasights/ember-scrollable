import Ember from 'ember';

export default Ember.Object.extend({
  duration: moment.duration(),
  title: null,
  time: null,

  endingTime: function() {
    return moment(this.get('time')).add(this.get('duration'));
  }.property('time', 'duration')
});
