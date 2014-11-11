import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':dropdown-item'],
  
  param: null,
  tagName: 'li',

  click: function() {
    this.sendAction('action', this.get('param'));
    this.get('parentView').close();
  }
});
