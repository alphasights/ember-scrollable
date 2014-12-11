import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNameBindings: [':quick-jump-result-content'],

  details: null,
  title: null,
  resourceId: null,
  resourcePath: null,

  url: function() {
    return `${config.APP.pistachioUrl}/${this.get('resourcePath')}/${this.get('resourceId')}`;
  }.property('resourceId', 'resourcePath')
});
