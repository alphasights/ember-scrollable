import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':sidebar', 'isCollapsed:collapsed'],

  isCollapsed: function() {
    if (this.get('controller.preferences.sideBarCollapsed') != null) {
      return this.get('controller.preferences.sideBarCollapsed');
    } else {
      return false;
    }
  }.property(),

  actions: {
    toggleCollapse: function() {
      this.get('controller').send('toggleCollapse', this.get('isCollapsed'));
      this.set('isCollapsed', !this.get('isCollapsed'));
    }
  },

  isCollapsedDidChange: function() {
    var growth;

    if (this.get('isCollapsed')) {
      growth = '-= 170px';
    } else {
      growth = '+= 170px';
    }

    this.$().velocity({
      width: growth
    }, {
      duration: 150
    });
  }.observes('isCollapsed')
});
