import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['width', 'length', 'radius', 'color'],
  classNameBindings: [':spinner'],
  
  color: '#000000',
  length: 3,
  radius: 4,
  width: 2,

  onDidInsertElement: function() {
    new Spinner(this.getProperties('width', 'length', 'radius', 'color'))
      .spin(this.$()[0]);
  }.on('didInsertElement')
});
