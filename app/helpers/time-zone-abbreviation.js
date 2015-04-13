import Ember from 'ember';

var timeZoneAbbreviation = function(date, timeZone = null) {
  if (timeZone != null) {
    return moment.tz(date, timeZone).format('z');
  } else {
    return date.toString().split(' ').slice(-1)[0].slice(1, -1);
  }
};

export default timeZoneAbbreviation;
