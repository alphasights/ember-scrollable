import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':progress-bar'],

  previousWidth: '0%',

  width: Ember.computed('ratio', function() {
    return `${Math.min(1, this.get('ratio')) * 100}%`;
  }),

  updateWidth: Ember.on('didInsertElement', function() {
    Ember.$.Velocity(this.$('> div')[0], {
      width: [this.get('width'), this.get('previousWidth')]
    }, {
      duration: 350
    });

    this.set('previousWidth', this.get('width'));
  }).observes('width')
});
