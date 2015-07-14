import Ember from 'ember';

export default Ember.Component.extend({
  feature: null,
  currentUser: null,
  owner: Ember.computed.oneWay('feature.owner'),
  featureParticipations: Ember.computed.oneWay('feature.featureParticipations'),
  maxNumberOfShownUsers: 10,
  canParticipate: Ember.computed.not('_hasReachedLimit'),

  participationButtonText: Ember.computed('_isCurrentUserParticipating', function() {
    return this.get('_isCurrentUserParticipating') ? 'Leave' : 'Join';
  }),

  participationButtonClass: Ember.computed('participationButtonText', function() {
    return this.get('participationButtonText').toLowerCase();
  }),

  _isCurrentUserParticipating: Ember.computed('_currentUserParticipation', function() {
    return !Ember.isEmpty(this.get('_currentUserParticipation'));
  }),

  _currentUserParticipation: Ember.computed('currentUser', 'featureParticipations.[]', function() {
    return this.get('featureParticipations').findBy('user', this.get('currentUser.model'));
  }),

  _hasReachedLimit: Ember.computed('feature.limit', 'featureParticipations.[]', function() {
    return this.get('feature.limit') !== null && this.get('featureParticipations.length') >= this.get('feature.limit');
  }),

  actions: {
    toggleParticipation: function() {
      if (this.get('_isCurrentUserParticipating')) {
        this.sendAction('leave', this.get('_currentUserParticipation'));
      } else {
        this.sendAction('join', this.get('feature'));
      }
    }
  }
});
