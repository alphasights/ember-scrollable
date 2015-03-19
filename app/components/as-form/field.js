import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  error: Ember.computed.oneWay('parentView.error'),
  showError: Ember.computed.oneWay('parentView.showError'),
  name: Ember.computed.oneWay('parentView.name'),
  label: Ember.computed.oneWay('parentView.label')
});
