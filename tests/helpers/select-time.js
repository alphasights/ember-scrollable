import Ember from 'ember';

var timeSlotHeight = function() {
  return $('.as-calendar-timetable-content')
    .find('.time-slots > li:first')
    .height();
};

var dayWidth = function() {
  var $content = $('.as-calendar-timetable-content');
  return $content.width() / $content.find('.days > li').length;
};

var pointForTime = function(options) {
  var $target = $('.as-calendar-timetable-content');
  var offsetX = options.day * dayWidth();
  var offsetY = options.timeSlot * timeSlotHeight();

  return {
    clientX: $target.offset().left + offsetX - $(document).scrollLeft(),
    clientY: $target.offset().top + offsetY - $(document).scrollTop()
  };
};

Ember.Test.registerAsyncHelper('selectTime', function(app, options) {
  Ember.run(() => {
    var $target = $('.as-calendar-timetable-content');
    var point = pointForTime(options);

    $target.simulate('mousedown', point);
    $target.simulate('mouseup', point);
  });

  return app.testHelpers.wait();
});
