import Ember from 'ember';

export default Ember.Mixin.create({
  progress: Ember.computed('deliveredAdvisorsCount', 'deliveryTarget', function() {
    var deliveryTarget = this.get('model.deliveryTarget');

    if (deliveryTarget === 0) {
      return 0;
    } else {
      return this.get('deliveredAdvisorsCount') / deliveryTarget;
    }
  })
});
