import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':app-switcher', 'active'],
  active: false,

  click: function() {
    this.sendAction('onClickOverlay');
  }
});
