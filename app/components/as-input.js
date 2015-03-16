import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['name', 'placeholder', 'value'],
  classNameBindings: ['className'],
  className: 'control input',

  formControlsView: Ember.computed.oneWay('parentView'),
  formView: Ember.computed.oneWay('formControlsView.parentView'),
  model: Ember.computed.oneWay('formView.model'),
  name: null,
  error: Ember.computed.alias('errors.firstObject'),
  showErrors: Ember.computed.alias('formView.showErrors'),

  nameDidChange: function() {
    var name = this.get('name');

    if (!name) { return; }

    Ember.defineProperty(this, 'value', Ember.computed.alias('model.' + name));
    Ember.defineProperty(this, 'errors', Ember.computed.alias('model.errors.' + name));
  }.observes('name').on('init')
});
