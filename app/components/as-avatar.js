import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt', 'title'],
  tagName: 'img',

  user: null,
  alt: Ember.computed.alias('user.initials'),
  src: Ember.computed.alias('user.avatarUrl'),
  title: Ember.computed.alias('user.name')
});
