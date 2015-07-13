import Ember from 'ember';

Ember.Test.registerAsyncHelper('select', function(app, selector, text) {
  let $option = app.testHelpers.findWithAssert(`${selector} option:contains('${text}')`);
  $option[0].selected = true;
  $option.trigger('change');

  return app.testHelpers.wait();
});
