import Ember from 'ember';

export default Ember.Component.extend({
  errorProperty: Ember.computed.oneWay('name'),
  optionLabelPath: 'content.name',
  optionValuePath: 'content.id'
});
