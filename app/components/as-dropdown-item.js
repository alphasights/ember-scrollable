import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  param: null,

  click: function() {
    this.sendAction('action', this.get('param'));
    this.get('parentView').close();
  }
});
