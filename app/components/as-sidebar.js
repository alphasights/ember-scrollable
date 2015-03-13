import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: null,
  classNameBindings: [':sidebar', 'isCollapsed:collapsed'],

  actions: {
    toggleCollapse: function() {
      this.toggleProperty('isCollapsed');
      this.sendAction('toggleCollapse');
    },

    logout: function() {
      window.location.replace(`${EmberENV.pistachioUrl}/logout`);
    }
  },

  didInsertElement: function() {
    this.addObserver('isCollapsed', this, this.animateWidth);
  },

  animateWidth: function() {
    var growth;

    if (this.get('isCollapsed')) {
      growth = '-= 170px';
    } else {
      growth = '+= 170px';
    }

    this.$().velocity({
      width: growth
    }, {
      duration: 150,
      progress: function() {
        Ember.$('.scrollable').TrackpadScrollEmulator('recalculate');
      }
    });
  }
});
