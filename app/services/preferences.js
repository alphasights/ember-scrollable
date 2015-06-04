import Ember from 'ember';

export default Ember.Service.extend({
  model: null,

  fetch: function() {
    return this.store.find('preferences').then((preferences) => {
      if (Ember.isEmpty(preferences)) {
        var newPreferences = this.store.createRecord('preferences');
        newPreferences.save();
        this.set('model', newPreferences);
      } else {
        this.set('model', preferences.get('firstObject'));
      }
    });
  }
});
