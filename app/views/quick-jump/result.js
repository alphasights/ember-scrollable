import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: ['type'],
  type: Ember.computed.alias('controller.type'),

  templateName: function() {
    if (this.get('type') != null) {
      return `quick-jump/result/${this.get('type')}`;
    } else {
      return null;
    }
  }.property('type')
});
