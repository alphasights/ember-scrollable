import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['name', 'content', 'prompt', 'value'],
  classNameBindings: ['className'],
  className: 'control select',

  formControlsView: Ember.computed.oneWay('parentView'),
  formView: Ember.computed.oneWay('formControlsView.parentView'),
  model: Ember.computed.oneWay('formView.model'),
  name: null,

  nameDidChange: function() {
    var name = this.get('name');

    if (!name) { return; }

    Ember.defineProperty(this, 'value', Ember.computed.alias('model.' + name));
  }.observes('name').on('init'),
});
