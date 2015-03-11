import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['name', 'contents', 'prompt'],
  classNameBindings: ['className'],
  className: 'control select'
});
