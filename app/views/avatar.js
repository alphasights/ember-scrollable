import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt', 'title'],
  tagName: 'img',

  alt: Ember.computed.alias('controller.initials'),
  src: Ember.computed.alias('controller.avatarUrl'),
  title: Ember.computed.alias('controller.name')
});
