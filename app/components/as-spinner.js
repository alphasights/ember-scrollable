import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['spinner'],

  onDidInsertElement: function() {
    new Spinner({
      width: 2,
      length: 3,
      radius: 4,
      color: '#ffffff'
    }).spin(this.$()[0]);
  }.on('didInsertElement')
});
