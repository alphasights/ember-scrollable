import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':widget'],
  layoutName: 'dashboard/widget'
});
