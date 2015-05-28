import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    teamId: {
      refreshModel: true
    }
  },
});
