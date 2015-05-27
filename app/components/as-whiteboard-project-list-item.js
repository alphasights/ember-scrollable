import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':whiteboard-project-list-item'],
  tagName: 'article',

  hasDeliveryTarget: Ember.computed.gt('project.deliveryTarget', 0),

  nonLeadMembers: Ember.computed('project.members.[]', function() {
    return _(this.get('project.members')).without(this.get('project.lead'));
  }),

  click: function(event) {
    // Prevent conflict with Foundation dropdown events

    if (this.$('.dropdown').has(Ember.$(event.target)).length === 0) {
      this.sendAction('clickOnProject', this.get('project'));
    }
  }
});
