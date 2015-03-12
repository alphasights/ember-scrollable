import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['name', 'placeholder', 'value'],
  classNameBindings: ['className'],
  className: 'control input',

  formControlsView: Ember.computed.oneWay('parentView'),
  formView: Ember.computed.oneWay('formControlsView.parentView'),
  model: Ember.computed.oneWay('formView.model'),
  name: null,

  nameDidChange: function() {
    var name = this.get('name');

    if (!name) { return; }

    Ember.defineProperty(this, 'value', Ember.computed.alias('model.' + name));
  }.observes('name').on('init'),

  hasErrors: function() {
    var name = this.get('name');

    return this.get('model.errors.' + name).length;
  }.property('model.errors'),

  errors: function() {
    var name = this.get('name');

    return _(this.get('model.errors.' + name)).map(function(value, key) {
      return value;
    });
  }.property('model.errors')
});
