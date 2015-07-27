import Ember from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

export default Ember.Component.extend(InboundActions, {
  classNameBindings: [':app-switcher', 'isActive:active'],
  isActive: false,

  click: function() {
    this._clickOverlay();
  },

  actions: {
    toggle: function() {
      this.toggleProperty('isActive');
    }
  },

  _clickOverlay: function() {
    this.set('isActive', false);
  }
});
