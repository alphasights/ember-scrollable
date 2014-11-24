import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':project'],

  click: function() {
    this.get('controller').transitionToRoute('team-project', this.get('controller.id'));
  }
});
