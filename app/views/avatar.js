import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':avatar'],
  tagName: 'img',
  attributeBindings: ['src', 'alt'],
  src: Ember.computed.alias('controller.avatarUrl'),
  alt: Ember.computed.alias('controller.intials')
});
