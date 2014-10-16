import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'views/sidebar',
  classNameBindings: [':sidebar', 'isCollapsed:collapsed'],
  isCollapsed: false,

  actions: {
    toggleCollapse: function() {
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
