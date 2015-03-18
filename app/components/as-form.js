import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form'],
  tagName: 'form',

  model: null,
  hasSubmitted: false,

  submit: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.set('hasSubmitted', true);
    this.get('model').validate();
  }
});
