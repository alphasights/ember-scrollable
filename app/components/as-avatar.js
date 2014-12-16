import Ember from 'ember';
import AsTooltip from './as-tooltip';

export default AsTooltip.extend({
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt', 'title'],
  tagName: 'img',
  tooltipPosition: 'top',

  user: null,
  alt: Ember.computed.alias('user.initials'),
  src: Ember.computed.alias('user.avatarUrl'),
  title: Ember.computed.alias('user.name')
});
