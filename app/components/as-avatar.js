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
  title: Ember.computed.oneWay('person.name'),
  alt: Ember.computed.oneWay('person.initials'),
  src: Ember.computed.any('person.avatarUrl', 'blankAvatarUrl'),

  setupTooltipster: Ember.observer('showTooltip', function() {
    Ember.run.schedule('afterRender', () => {
      if (this.get('showTooltip')) {
        this.$().tooltipster('enable');
      } else {
        this.$().tooltipster('disable');
      }
    });
  }).on('didInitializeTooltipster')
});
