import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNameBindings: [':page-placeholder'],
  tagName: 'section',

  icon: 'default',
  pageName: null,
  path: 'system',

  externalPath: function() {
    return config.APP.pistachioUrl + '/' + this.get('path');
  }.property('externalPath')
});
