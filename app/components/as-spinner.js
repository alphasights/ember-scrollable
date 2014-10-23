import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['spinner'],
  attributeBindings: ['width', 'length', 'radius', 'color'],
  width: 2,
  length: 3,
  radius: 4,
  color: '#000000',

  onDidInsertElement: function() {
    new Spinner({
      width: this.get('width'),
      length: this.get('length'),
      radius: this.get('radius'),
      color: this.get('color')
    }).spin(this.$()[0]);
  }.on('didInsertElement')
});
