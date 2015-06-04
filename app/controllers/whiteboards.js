import Ember from 'ember';

export default Ember.Controller.extend({
  warden: Ember.inject.service(),
  currentUser: Ember.computed.oneWay('warden.currentUser'),
  showWhiteboardSelect: false,
  selectedWhiteboard: null,
  whiteboardSelectChanged: false,
  multipleWhiteboardsAvailable: Ember.computed.gt('whiteboards.length', 1),

  whiteboards: Ember.computed('model.[]', 'currentUser.teams.@each.defaultWhiteboard', function() {
    return this.get('model').toArray().concat(this.get('currentUser.teams').mapBy('defaultWhiteboard')).sortBy('type');
  }),

  pistachioUrl: Ember.computed(function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }),

  onWhiteboardSelectChange: function() {
    this.get('controller').set('whiteboardSelectChanged', true);
  },

  selectedWhiteboardDidChange: Ember.observer('selectedWhiteboard', function() {
    if (this.get('whiteboardSelectChanged')) {
      this.set('whiteboardSelectChanged', false);
      this.set('showWhiteboardSelect', false);
      this.transitionToRoute('whiteboards.whiteboard', this.get('selectedWhiteboard.id'));
    }
  }),

  actions: {
    toggleWhiteboardSelect: function() {
      this.toggleProperty('showWhiteboardSelect');
    },

    submitFeedback: function() {
      /* jshint newcap: false */
      Intercom('showNewMessage');
      /* jshint newcap: true */
    }
  }
});
