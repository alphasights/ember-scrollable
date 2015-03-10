import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(time, timeZone, format) {
  return moment.tz(time, timeZone).format(format);
});
