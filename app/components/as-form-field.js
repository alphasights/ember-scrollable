import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  error: Ember.computed.oneWay('parentView.error'),
  showErrors: Ember.computed.oneWay('parentView.showErrors'),
  name: Ember.computed.oneWay('parentView.name'),
  label: Ember.computed.oneWay('parentView.label'),
});
