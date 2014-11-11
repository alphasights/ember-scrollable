import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':progress-indicator'],
  
  spinnerColor: '#000000',
  spinnerLength: 3,
  spinnerRadius: 4,
  spinnerWidth: 2
});
