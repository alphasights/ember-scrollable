import Ember from 'ember';
import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

export default TooltipsterComponent.extend({
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt', 'title'],
  tagName: 'img',

  position: 'top',

  showTooltip: true,
  person: null,
  title: Ember.computed.alias('person.name'),

  disableTootlipster: function() {
    if (!this.get('showTooltip')) {
      Ember.run.schedule('afterRender', () => {
        this.$().tooltipster('disable');
      });
    }
  }.on('didInsertElement'),

  alt: function() {
    return this.get('person.initials') || this.get('person.name');
  }.property('person.initials', 'person.name'),

  src: function() {
    return this.get('person.avatarUrl') || EmberENV.blankAvatarUrl;
  }.property('person.avatarUrl')
});
