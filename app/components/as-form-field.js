import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-field'],

  _context: Ember.computed.alias('parentView')
});