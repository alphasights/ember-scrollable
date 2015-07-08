import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('date'),
  interaction: DS.belongsTo('interaction'),
  interactionType: DS.attr('string'),
  duration: DS.attr('number'),
  quality: DS.attr('string', { defaultValue: 'good' }),
  speakQuality: DS.attr('string'),
  speakExplanation: DS.attr('string'),
  voidedAt: DS.attr('date')
});
