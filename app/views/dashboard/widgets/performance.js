import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':widget', ':performance', 'targetClass'],

  targetClass: 'on-target'
});
