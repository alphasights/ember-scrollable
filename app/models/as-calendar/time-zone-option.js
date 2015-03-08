import Ember from 'ember';

export default Ember.Object.extend({
  title: null,
  abbreviation: null,

  description: function() {
    return `${this.get('title')} (${this.get('abbreviation')})`;
  }.property('title', 'abbreviation')
});
