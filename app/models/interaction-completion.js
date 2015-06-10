import DS from 'ember-data';
import EmberValidations from 'ember-validations';

var qualityOptions = ['good', 'bad'];

var InteractionCompletion = DS.Model.extend(EmberValidations.Mixin, {
  interaction: DS.belongsTo('interaction'),
  interactionType: DS.attr('string'),
  duration: DS.attr('number'),
  quality: DS.attr('string'),

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
  }
});

InteractionCompletion.reopenClass({
  qualityOptions: qualityOptions
});

export default InteractionCompletion;
