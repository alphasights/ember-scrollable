import Ember from 'ember';

export default function (error) {
  Honeybadger.notify(error);
  Ember.Logger.error(error.stack);
}
