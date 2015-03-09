import Ember from 'ember';

export default Ember.Object.extend({
  title: null,
  value: null,
  
  abbreviation: function() {
    return moment().tz(this.get('value')).format('z');
  }.property('value'),

  description: function() {
    return `${this.get('title')} (${this.get('abbreviation')})`;
  }.property('title', 'abbreviation')
});
