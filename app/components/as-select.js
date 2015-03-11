import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['name', 'content', 'prompt'],
  classNameBindings: ['className'],
  className: 'control select'
});
