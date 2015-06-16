import Ember from 'ember';
import notify from 'phoenix/helpers/notify';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

export default Ember.Component.extend({
  classNameBindings: [':email-composer'],
  model: null,
  selectedTemplate: null,
  isEditingHeader: false,
  showPreview: false,

  initializeDefaults: Ember.on('init', function() {
    if (this.get('templates') == null) {
      this.set('templates', []);
    }
  }),

  onSelectedTemplateDidChange: Ember.observer('selectedTemplate', function() {
    this.set('model.body', this.get('selectedTemplate.body'));
  }),

  variablesMapping: Ember.computed('variables', function() {
    return this.get('variables').reduce(function(result, variable) {
      result[variable.get('key')] = variable.get('value');
      return result;
    }, {});
  }),

  preview: Ember.computed('model.body', 'variablesMapping', function() {
    if (Ember.isPresent(this.get('model.body'))) {
      var result = _.template(this.get('model.body'))(this.get('variablesMapping'));
      result = result.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Ember.Handlebars.SafeString(result);
    }
  }),

  actions: {
    send: function() {
      this.get('model').save().then(() => {
        notify(`Your email to ${this.get('model.recipients')} has been delivered.`);
        this.get('sidePanel').send('close');
      }).catch(function() {
        notify('There has been an error delivering your email.', 'error');
      });
    },

    toggleIsEditingHeader: function() {
      this.toggleProperty('isEditingHeader');
    },

    togglePreview: function() {
      this.toggleProperty('showPreview');
    }
  }
});
