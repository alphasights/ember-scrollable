import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: null,
  
  preferences: Ember.Object.create({
    sidebarCollapsed: false,
    save: function() {}
  }),

  classNameBindings: [':sidebar', 'isCollapsed:collapsed'],
  isCollapsed: Ember.computed.oneWay('preferences.sidebarCollapsed'),

  actions: {
    toggleCollapse: function() {
      var preferences = this.get('preferences');

      preferences.toggleProperty('sidebarCollapsed');
      preferences.save();
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
