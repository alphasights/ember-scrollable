import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form'],
  tagName: 'form',

  model: null,
  hasSubmitted: false,

  actions: {
    submit: function() {
      this.set('hasSubmitted', true);
      this.get('model').validate();
    }
  }
});
