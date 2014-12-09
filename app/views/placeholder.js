import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':placeholder'],
  tagName: 'section',

  onDidInsertElement: function() {
    this.$('> div > p').velocity("transition.slideUpIn", { stagger: 150, drag: true});
  }.on('didInsertElement')
});
