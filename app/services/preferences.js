import Ember from 'ember';

export default Ember.Service.extend({
  model: null,

  sidebarCollapsed: Ember.computed.alias('model.sidebarCollapsed'),
  unusedAdvisorEmailTemplateId: Ember.computed.alias('model.unusedAdvisorEmailTemplateId'),

  fetch: function() {
    return this.store.findAll('preferences').then((preferences) => {
      if (Ember.isEmpty(preferences)) {
        var newPreferences = this.store.createRecord('preferences');
        newPreferences.save();
        this.set('model', newPreferences);
      } else {
        this.set('model', preferences.get('firstObject'));
      }
    });
  },

  save: function() {
    return this.get('model').save();
  }
});
