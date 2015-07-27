import Ember from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

export default Ember.Component.extend(InboundActions, {
  classNameBindings: [':app-switcher', 'isActive:active'],
  isActive: false,

  onClickOverlay: Ember.on('click', function() {
    this.set('isActive', false);
  }),

  actions: {
    toggle: function() {
      this.toggleProperty('isActive');
    }
  }
});
