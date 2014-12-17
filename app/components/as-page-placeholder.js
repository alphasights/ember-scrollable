import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':page-placeholder'],
  tagName: 'section',

  pageName: null,
  path: null,

  url: function() {
    return `${window.EmberENV.pistachioUrl}/${this.get('path')}`;
  }.property('externalPath')
});
