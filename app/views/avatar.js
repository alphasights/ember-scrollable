import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt'],
  tagName: 'img',

  alt: Ember.computed.alias('controller.intials'),
  src: Ember.computed.alias('controller.avatarUrl')
});
