import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':widget'],
  layoutName: 'dashboard/widget',
  name: null,
  title: Ember.computed.oneWay('name')
});
