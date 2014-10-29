import Ember from 'ember';

export default Ember.Component.extend({
  options: function() {
    return `align: ${this.get('align')}`;
  }.property('align'),

  id: function() {
    return `${Ember.guidFor(this)}-dropdown`;
  }.property('element'),

  close: function() {
    this.$('> button').trigger('click');
  }
});
