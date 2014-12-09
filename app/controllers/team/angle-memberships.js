import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['team'],
  team: Ember.computed.alias('controllers.team')
});
