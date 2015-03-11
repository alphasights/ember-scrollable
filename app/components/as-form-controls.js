import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['className'],
  className: 'controls',
  tagName: 'fieldset'
});
