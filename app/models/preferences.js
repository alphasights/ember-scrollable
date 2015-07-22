import DS from 'ember-data';
import Ember from 'ember';

Ember.Inflector.inflector.uncountable('preferences');

export default DS.Model.extend({
  sidebarCollapsed: DS.attr('boolean', { defaultValue: false }),
  unusedAdvisorEmailTemplateId: DS.attr('string')
});
