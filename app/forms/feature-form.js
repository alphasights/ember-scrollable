import Ember from 'ember';
import Form from 'phoenix/forms/form';

export default Form.extend({
  genericErrorMessage: 'There has been an error with the feature.',

  setDefaultValues: function(){
  },

  setPersistedValues: function() {
    var model = this.get('model');

    model.setProperties({
      name: this.get('name'),
      briefDescription: this.get('briefDescription'),
      limit: this.get('limit'),
      description: this.get('description')
    });
  },

  availableBadgeNames: Ember.computed('badges', '_usedBadgeNames', function() {
    let allBadges = this.get('badges');
    let usedBadgeNames = this.get('_usedBadgeNames');
    let availableBadges = _.difference(allBadges, usedBadgeNames);

    return _.map(availableBadges, function(badgeName) {
      let humanizedBadgeName = badgeName.replace(/_/g, ' ').replace( /\b\w/g, function(word) {
        return word.toUpperCase();
      });

      return { id: badgeName, name: humanizedBadgeName };
    });
  }),

  _usedBadgeNames: Ember.computed('features', function() {
    return _.map(this.get('features').toArray(), function(feature){
      return feature.get('badgeName');
    });
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
    }
  }
});
