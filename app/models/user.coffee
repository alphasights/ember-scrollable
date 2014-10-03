`import DS from 'ember-data'`

User = DS.Model.extend
  initials: DS.attr('string')
  name: DS.attr('string')
  avatarUrl: DS.attr('string')

`export default User`
