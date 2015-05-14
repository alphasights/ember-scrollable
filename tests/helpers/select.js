import Ember from 'ember';

Ember.Test.registerAsyncHelper('select', function(app, selector) {
  var $option = findWithAssert(selector);
  $option.prop('selected', true);
  triggerEvent($option.parents('select:first'), 'change');

  return app.testHelpers.wait();
});
