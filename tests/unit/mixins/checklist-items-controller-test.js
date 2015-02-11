import Ember from 'ember';
import ChecklistItemsControllerMixin from 'phoenix/mixins/checklist-items-controller';

module('ChecklistItemsControllerMixin');

// Replace this with your real tests.
test('it works', function() {
  var ChecklistItemsControllerObject = Ember.Object.extend(ChecklistItemsControllerMixin);
  var subject = ChecklistItemsControllerObject.create();
  ok(subject);
});
