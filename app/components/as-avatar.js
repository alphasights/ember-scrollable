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
    var method;

    if (this.get('showTooltip')) {
      method = 'enable';
    } else {
      method = 'disable';
    }

    Ember.run.schedule('afterRender', () => {
      this.$().tooltipster(method);
    });
  }.observes('showTooltip').on('didInsertElement')
});
