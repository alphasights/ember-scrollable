import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNameBindings: [':page-placeholder', 'pageCssClass'],
  tagName: 'section',

  pageName: null,
  path: 'system',

  externalPath: function() {
    return config.APP.pistachioUrl + '/' + this.get('path');
  }.property('externalPath'),

  pageCssClass: function() {
    return this.get('pageName').dasherize();
  }.property('pageCssClass')
});
