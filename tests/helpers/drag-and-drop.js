import Ember from 'ember';

Ember.Test.registerAsyncHelper('dragAndDrop', function(app, selector, targetSelector) {
  var $element = findWithAssert(selector);
  var $target = findWithAssert(targetSelector);

  Ember.run(function() {
    $element.simulate('drag-n-drop', {
      dragTarget: $target
    });
  });

  return app.testHelpers.wait();
});
