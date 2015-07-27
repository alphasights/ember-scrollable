import Ember from 'ember';
import Form from 'phoenix/forms/form';

export default Form.extend({
  genericErrorMessage: 'There has been an error with the lab.',

  setDefaultValues: function(){
    this.set('name', this.get('model.name'));
    this.set('badgeName', this.get('model.badgeName'));
    this.set('briefDescription', this.get('model.briefDescription'));
    this.set('limit', this.get('model.limit'));
    if (this.get('limit') != null) {
      this.set('showLimit', true);
    } else {
      this.set('showLimit', false);
    }
  },

  setPersistedValues: function() {
    var model = this.get('model');

    model.setProperties({
      name: this.get('name'),
      badgeName: this.get('badgeName'),
      briefDescription: this.get('briefDescription'),
      limit: this.get('limit'),
      description: this.get('description')
    });
  },

  availableBadgeNames: Ember.computed('_availableBadges.[]', function() {
    let availableBadges = this.get('_availableBadges');

    return _.map(availableBadges, function(badgeName) {
      let humanizedBadgeName = badgeName.replace(/_/g, ' ').replace( /\b\w/g, function(word) {
        return word.toUpperCase();
      });

      return { id: badgeName, name: humanizedBadgeName };
    });
  }),

  _usedBadgeNames: Ember.computed('features.[]', function() {
    return _.map(this.get('features').toArray(), function(feature){
      return feature.get('badgeName');
    });
  }),

  _availableBadges: Ember.computed('badges.[]', '_usedBadgeNames.[]', 'badgeName', function() {
    let allBadges = this.get('badges');
    let usedBadgeNames = this.get('_usedBadgeNames');
    usedBadgeNames.addObject(this.get('badgeName'));
    return  _.difference(allBadges, usedBadgeNames);
  }),

  validations: {
    name: {
      presence: true
    },

    briefDescription: {
      presence: true
    },

    limit: {
      numericality: { allowBlank: true, onlyInteger: true }
    },

    badgeName: {
      presence: true
    }
  }
});
