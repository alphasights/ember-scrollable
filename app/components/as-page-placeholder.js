import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':placeholder'],
  attributeBindings: ['icon', 'sectionName', 'link'],
  tagName: 'section',

  externalUrl: 'https://secure.alphasights.com/',

  icon: 'default',
  sectionName: null,
  link: 'system',

  externalLink: function() {
    return this.get('externalUrl') + this.get('link');
  }.property('externalLink')
});
