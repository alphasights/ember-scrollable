import Ember from 'ember';
import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

export default TooltipsterComponent.extend({
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt', 'title'],
  tagName: 'img',

  position: 'top',
  theme: 'tooltipster-avatar',

  user: null,
  alt: Ember.computed.alias('user.initials'),
  src: Ember.computed.alias('user.avatarUrl'),
  title: Ember.computed.alias('user.name')
});
