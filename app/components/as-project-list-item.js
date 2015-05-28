import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':project-list-item'],
  tagName: 'article',

  nonLeadMembers: Ember.computed('project.members.[]', function() {
    return _(this.get('project.members')).without(this.get('project.lead'));
  }),

  click: function() {
    this.sendAction('onProjectClick', this.get('project'));
  }
});
