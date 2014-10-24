import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['progress-indicator'],
  layoutName: 'components/progress-indicator',
  spinnerWidth: 2,
  spinnerLength: 3,
  spinnerRadius: 4,
  spinnerColor: '#000000'
});
