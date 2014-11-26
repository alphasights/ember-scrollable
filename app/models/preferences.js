import DS from 'ember-data';
import Ember from 'ember';

Ember.Inflector.inflector.uncountable('preferences');

export default DS.Model.extend({
  sideBarCollapsed: DS.attr('boolean')
});
