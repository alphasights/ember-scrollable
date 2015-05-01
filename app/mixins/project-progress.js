import Ember from 'ember';

export default Ember.Mixin.create({
  progress: Ember.computed('model.deliveredAdvisorsCount', 'model.deliveryTarget', function() {
    var deliveryTarget = this.get('model.deliveryTarget');

    if (deliveryTarget === 0) {
      return 0;
    } else {
      return this.get('model.deliveredAdvisorsCount') / deliveryTarget;
    }
  })
});
