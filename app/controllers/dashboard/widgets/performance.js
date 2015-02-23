import Ember from 'ember';

export default Ember.ObjectController.extend({
  performanceBarClass: function() {
    if (this.get('model.hasFulfilledTarget')) {
      return 'gold-bar';
    } else if (this.get('model.isOnPace')) {
      return 'green-bar';
    } else {
      return 'red-bar';
    }
  }.property('model.hasFulFilledTarget', 'model.isOnPace')
});
