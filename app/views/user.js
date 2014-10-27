import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['user'],
  tagName: 'img',
  attributeBindings: ['src', 'alt'],
  src: Ember.computed.alias('controller.avatarUrl'),
  alt: Ember.computed.alias('controller.intials')
});
