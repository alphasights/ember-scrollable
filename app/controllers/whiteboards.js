import Ember from 'ember';
import groupByForSelect from 'phoenix/helpers/group-by-for-select';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  showWhiteboardSelect: false,
  selectedWhiteboard: null,
  whiteboardSelectChanged: false,
  multipleWhiteboardsAvailable: Ember.computed.gt('whiteboards.length', 1),

  whiteboards: Ember.computed('model.[]', 'currentUser.teams.@each.defaultWhiteboard', function() {
    return this.get('model').toArray().concat(this.get('currentUser.teams').mapBy('defaultWhiteboard')).sortBy('type');
  }),

  groupedWhiteboards: Ember.computed('whiteboards.[]', function() {
    return groupByForSelect(this.get('whiteboards'), 'type');
  }),

  pistachioUrl: Ember.computed(function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }),

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
    },

    changeSelectedWhiteboard: function() {
      this.set('whiteboardSelectChanged', true);
    },
  }
});
