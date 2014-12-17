import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':quick-jump-result-content'],

  details: null,
  title: null,
  resourceId: null,
  resourcePath: null,

  url: function() {
    return `${EmberENV.pistachioUrl}/${this.get('resourcePath')}/${this.get('resourceId')}`;
  }.property('resourceId', 'resourcePath')
});
