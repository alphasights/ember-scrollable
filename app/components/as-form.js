import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['className'],
  className: 'form',
  tagName: 'form',
  model: null,
  showErrors: false,

  submit: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.set('showErrors', true);
    this.get('model').validate();
  },

  hasErrors: function() {
    return !this.get('model.isValid');
  }.property('model.isValid')
});
