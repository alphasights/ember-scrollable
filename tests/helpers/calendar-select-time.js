import Ember from 'ember';
import { selectTime } from 'ember-calendar/test-helpers/all';

Ember.Test.registerAsyncHelper('calendarSelectTime',
  function(app, options) {
    selectTime(options);
    return app.testHelpers.wait();
  }
);
