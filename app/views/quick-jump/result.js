import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: ['type'],
  type: Ember.computed.alias('controller.type'),

  templateName: function() {
    return `quick-jump/result/${this.get('type')}`;
  }.property('type')
});
