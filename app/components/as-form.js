import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['className'],
  className: 'form',
  tagName: 'form',
  model: null,

  submit: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.get('model').validate();
  },

  hasErrors: function() {
    return !this.get('model.isValid');
  }.property('model.isValid'),

  errors: function() {
    return _(this.get('model.errors')).map(function(value, key) {
      return value;
    });
  }.property('model.errors', 'model.isValid')
});
