import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: [':form-field', 'hasErrors:with-errors'],
  layoutName: 'components/as-form-field',

  fieldsetView: Ember.computed.oneWay('parentView'),
  formView: Ember.computed.oneWay('fieldsetView.parentView'),
  model: Ember.computed.oneWay('formView.model'),
  error: Ember.computed.oneWay('errors.firstObject'),
  showErrors: Ember.computed.oneWay('formView.showErrors'),
  name: null,
  label: null,

  nameDidChange: function() {
    var name = this.get('name');

    if (name != null) {
      Ember.defineProperty(this, 'value', Ember.computed.alias('model.' + name));
      Ember.defineProperty(this, 'errors', Ember.computed.alias('model.errors.' + name));
    }
  }.observes('name').on('init'),

  hasErrors: function() {
    if (this.get('showErrors')) {
      return this.get('error') != null;
    }
  }.property('error', 'showErrors')
});