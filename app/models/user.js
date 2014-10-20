import DS from 'ember-data';

export default DS.Model.extend({
  initials: DS.attr('string'),
  name: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  teamId: DS.attr('string'),
  developer: DS.attr('boolean'),

  nameAndInitials: (function() {
    return `${this.get('name')} (${this.get('initials')})`;
  }).property('name', 'initials')
});
