import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':quick-jump-result-content'],

  details: null,
  title: null,
  id: null,
  path: null,

  url: function() {
    return `http://secure.alphasights.com/${this.get('path')}/${this.get('id')}`;
  }.property('id', 'path')
});
