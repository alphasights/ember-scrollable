import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: [':form-field', 'showError:with-errors'],
  layoutName: 'components/as-form/field',

  fieldsetView: Ember.computed.oneWay('parentView'),
  formView: Ember.computed.oneWay('fieldsetView.parentView'),
  model: Ember.computed.oneWay('formView.model'),
  errorProperty: Ember.computed.oneWay('name'),
  hasSubmitted: Ember.computed.oneWay('formView.hasSubmitted'),
  name: null,
  label: null,
  errorMessage: null,
  disabled: false,

  nameOrErrorDidChange: function() {
    var name = this.get('name');

    if (name != null) {
      Ember.defineProperty(this, 'value', Ember.computed.alias('model.' + name));
      Ember.defineProperty(this, 'errors', Ember.computed.alias('model.errors.' + this.get('errorProperty')));
    }
  }.observes('name', 'errorProperty').on('init'),

  showError: function() {
    if (this.get('hasSubmitted')) {
      return this.get('error') != null;
    }
  }.property('error', 'hasSubmitted'),

  error: function() {
    var error = this.get('errors.firstObject');
    var errorMessage = this.get('errorMessage') || this.get('errors.firstObject');

    if (error != null) {
      return errorMessage;
    } else {
      return null;
    }
  }.property('errorMessage', 'errors.firstObject')
});
