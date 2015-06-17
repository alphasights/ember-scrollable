import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-field', 'showError:with-errors', 'disabled:disabled'],

  model: Ember.computed.oneWay('form.model'),
  hasSubmitted: Ember.computed.oneWay('form.hasSubmitted'),
  name: null,
  label: null,
  errorMessage: null,
  disabled: false,

  nameOrErrorDidChange: Ember.observer('name', 'errorProperty', function() {
    var name = this.get('name');

    if (name != null) {
      Ember.defineProperty(this, 'value', Ember.computed.alias('model.' + name));
      Ember.defineProperty(this, 'errors', Ember.computed.alias('model.errors.' + this.get('errorProperty')));
    }
  }).on('init'),

  showError: Ember.computed('error', 'hasSubmitted', function() {
    if (this.get('hasSubmitted')) {
      return this.get('error') != null;
    }
  }),

  error: Ember.computed('errorMessage', 'errors.firstObject', function() {
    var error = this.get('errors.firstObject');
    var errorMessage = this.get('errorMessage') || this.get('errors.firstObject');

    if (error != null) {
      return errorMessage;
    } else {
      return null;
    }
  })
});
