import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['name', 'placeholder'],
  classNameBindings: ['className'],
  className: 'control input'
});
