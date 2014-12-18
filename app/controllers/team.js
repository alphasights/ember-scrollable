import Ember from 'ember';

export default Ember.ObjectController.extend({
  queryParams: {
    sortPropertyId: 'sort_by'
  },

  sortPropertyId: 'priority',

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }.property(),

  actions: {
    submitFeedback: function() {
      /* jshint newcap: false */
      Intercom('showNewMessage');
      /* jshint newcap: true */
    }
  }
});
