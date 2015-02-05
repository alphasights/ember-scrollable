import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

export default TooltipsterComponent.extend({
  classNameBindings: [':avatar'],
  attributeBindings: ['src', 'alt', 'title'],
  tagName: 'img',

  position: 'top',

  showTooltip: true,
  person: null,

  alt: function() {
    var alt = this.get('person.initials') ? 'initials' : 'name';
    return this.get(`person.${alt}`);
  }.property('person.initials', 'person.name'),

  src: function() {
    if (this.get('person.avatarUrl')) {
      return this.get('person.avatarUrl');
    } else {
      return EmberENV.blankAvatarUrl;
    }
  }.property('person.avatarUrl'),

  title: function() {
    return (this.get('showTooltip')) ? this.get('person.name') : null;
  }.property('showTooltip', 'person.name')
});
