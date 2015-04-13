import Ember from 'ember';

var systemTimezone = function() {
  return new Date().toString().split(' ').slice(-1)[0].slice(1, -1)
};

Ember.Handlebars.makeBoundHelper(systemTimezone);

export default systemTimezone;
