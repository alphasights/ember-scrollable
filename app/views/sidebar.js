import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':sidebar', 'isCollapsed:collapsed'],
  isCollapsed: Ember.computed.alias('controller.preferences.sidebarCollapsed'),

  actions: {
    toggleCollapse: function() {
      var isCollapsed = this.get('isCollapsed');

      this.get('controller').send('toggleCollapse', isCollapsed);
      this.set('isCollapsed', !isCollapsed);
    }
  },

  didInsertElement: function() {
    this.addObserver('isCollapsed', this, this.animateSidebar);
  },

  animateSidebar: function() {
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
  }
});
