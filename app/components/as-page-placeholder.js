import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':page-placeholder'],
  tagName: 'section',

  pageName: null,
  path: null,

  url: Ember.computed('externalPath', function() {
    return `${EmberENV.pistachioUrl}/${this.get('path')}`;
  })
});
