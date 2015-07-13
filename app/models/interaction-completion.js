import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('date'),
  customCredits: DS.attr('number'),
  customRevenue: DS.attr('number'),
  duration: DS.attr('number'),
  interaction: DS.belongsTo('interaction'),
  interactionType: DS.attr('string'),
  quality: DS.attr('string'),
  speakQuality: DS.attr('string'),
  speakExplanation: DS.attr('string'),
  voidedAt: DS.attr('date')
});
