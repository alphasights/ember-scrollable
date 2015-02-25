import Ember from 'ember';
import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

export default TooltipsterComponent.extend({
  blankAvatarUrl: EmberENV.blankAvatarUrl,
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt', 'title'],
  tagName: 'img',

  position: 'top',

  showTooltip: true,
  person: null,
  title: Ember.computed.alias('person.name'),
  alt: Ember.computed.alias('person.initials'),
  src: Ember.computed.any('person.avatarUrl', 'blankAvatarUrl'),

  setupTooltipster: function() {
    Ember.run.schedule('afterRender', () => {
      if (this.get('showTooltip')) {
        this.$().tooltipster('enable');
      } else {
        this.$().tooltipster('disable');
      }
    });
  }.observes('showTooltip').on('didInsertElement')
});
