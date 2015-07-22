import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':lab', '_isCurrentUserParticipating:mine'],
  feature: null,
  currentUser: null,
  owner: Ember.computed.oneWay('feature.owner'),
  featureParticipations: Ember.computed.oneWay('feature.featureParticipations'),
  maxNumberOfShownUsers: 10,

  canParticipate: Ember.computed('feature.hasReachedLimit', '_isCurrentUserParticipating', function() {
    return this.get('_isCurrentUserParticipating') || !this.get('feature.hasReachedLimit');
  }),

  participationButtonText: Ember.computed('_isCurrentUserParticipating', function() {
    return this.get('_isCurrentUserParticipating') ? 'Leave' : 'Join';
  }),

  participationButtonClass: Ember.computed('participationButtonText', function() {
    return this.get('participationButtonText').toLowerCase();
  }),

  _isCurrentUserParticipating: Ember.computed('_currentUserParticipation', function() {
    return !Ember.isEmpty(this.get('_currentUserParticipation'));
  }),

  _currentUserParticipation: Ember.computed('feature', 'currentUser.model.featureParticipations.[]', function() {
    return this.get('currentUser.model.featureParticipations').findBy('feature', this.get('feature'));
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
