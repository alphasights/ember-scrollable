import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  classNameBindings: [':quick-jump-result-content'],

  details: null,
  title: null,
  id: null,
  path: null,

  url: function() {
    return `${config.APP.apiHost}/${this.get('path')}/${this.get('id')}`;
  }.property('id', 'path')
});
