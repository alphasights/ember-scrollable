import Ember from 'ember';
import ProjectProgressMixin from 'phoenix/mixins/project-progress';

module('ProjectProgressMixin');

test('#progress returns 0 when the deliveryTarget is 0', function() {
  var ProjectProgressObject = Ember.Object.extend(ProjectProgressMixin, {
    deliveryTarget: 0
  });

  var subject = ProjectProgressObject.create();
  equal(subject.get('progress'), 0);
});

test('#progress returns the correct value when the deliveryTarget is not 0', function() {
  var ProjectProgressObject = Ember.Object.extend(ProjectProgressMixin, {
    deliveredAdvisorsCount: 1,
    deliveryTarget: 4,
  });

  var subject = ProjectProgressObject.create();
  equal(subject.get('progress'), 0.25);
});
