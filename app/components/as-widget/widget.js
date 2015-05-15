import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':widget'],
  layoutName: 'components/as-widget/widget',
  widgetTemplateName: null,
  name: null,
  title: Ember.computed.oneWay('name')
});
