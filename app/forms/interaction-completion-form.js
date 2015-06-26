import Ember from 'ember';
import Form from 'phoenix/forms/form';

const qualityOptionsMapping = {
  'good': 'Good',
  'bad': 'Bad'
};

const qualityOptions = ['good', 'bad'];

export default Form.extend({
  genericErrorMessage: 'There has been an error completing the interaction.',

  setDefaultValues: function() {
    this.set('quality', 'good');
    this.set('interactionType', this.get('model.interaction.interactionType'));
  },

  setPersistedValues: function() {
    var model = this.get('model');

    model.setProperties({
      duration: this.get('duration'),
      quality: this.get('quality'),
      interactionType: this.get('interactionType')
    });
  },

  validations: {
    duration: {
      numericality: { onlyInteger: true, greaterThanOrEqualTo: 0 }
    },

    quality: {
      inclusion: { in: qualityOptions }
    },

    interactionType: {
      presence: true
    }
  },

  qualityOptions: Ember.computed(function() {
    return qualityOptions.map(function(option) {
      return Ember.Object.create({
        id: option,
        name: qualityOptionsMapping[option]
      });
    });
  })
});
