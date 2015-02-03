import DS from 'ember-data';

var Interaction = DS.Model.extend({
  advisor: DS.belongsTo('advisor', { async: true }),
  clientContact: DS.belongsTo('clientContact', { async: true }),
  project: DS.belongsTo('project', { async: true }),
  scheduledCallTime: DS.attr('date')
});

Interaction.reopenClass({
  FIXTURES: [
    {
      id: 1,
      advisor: 1,
      clientContact: 1,
      project: 29976,
      scheduledCallTime: '2015-02-27T16:46:03.347+01:00'
    },
    {
      id: 2,
      advisor: 2,
      clientContact: 2,
      project: 101,
      scheduledCallTime: '2015-02-21T16:46:03.347+01:00'
    }
  ]
});

export default Interaction;
