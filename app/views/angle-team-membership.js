import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'views/angle-team-membership',

  onWillDestroyElement: function() {
    if (this.get('controller.isEditing')) {
      this.get('controller').send('updateTarget');
    }
  }.on('willDestroyElement')
});
