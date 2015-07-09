import Ember from 'ember';
import groupByForSelect from 'phoenix/helpers/group-by-for-select';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  showWhiteboardSelect: false,
  selectedWhiteboardId: null,
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
      let selectedWhiteboardId = event.target.value;
      this.set('selectedWhiteboard', this.get('whiteboards').findBy('id', selectedWhiteboardId));
      this.transitionToRoute('whiteboards.whiteboard', selectedWhiteboardId);
    },
  }
});
