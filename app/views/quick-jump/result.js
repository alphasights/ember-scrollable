import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: ['type'],
  availableTypes: ['project', 'user', 'contact', 'advisor'],

  type: function() {
    var type = this.get('controller.type');

    if (type != null && this.get('availableTypes').contains(type)) {
      return type;
    } else {
      return 'default';
    }
  }.property('controller.type'),

  templateName: function() {
    return `quick-jump/result/${this.get('type')}`;
  }.property('type')
});
