import Ember from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

export default Ember.Component.extend(InboundActions, {
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
    this.set('model.subject', this.get('selectedTemplate.subject'));
  }),

  variablesMapping: Ember.computed('variables', function() {
    return this.get('variables').reduce(function(result, variable) {
      result[variable.get('key')] = variable.get('value');
      return result;
    }, {});
  }),

  renderBody: function(body, variablesMapping) {
    if (Ember.isPresent(body)) {
      return body.replace(/\{\{(.+?)\}\}/g, function(_, name) {
        if (variablesMapping.hasOwnProperty(name)) {
          return variablesMapping[name];
        } else {
          throw `{{${name}}} is not a valid placeholder.`;
        }
      });
    } else {
      return null;
    }
  },

  renderedBody: Ember.computed('model.body', 'variablesMapping', 'renderedBodyError', function() {
    var body = this.get('model.body');

    if (this.get('renderedBodyError') == null) {
      return this.renderBody(body, this.get('variablesMapping'));
    } else {
      return body;
    }
  }),

  renderedBodyError: Ember.computed('model.body', 'variablesMapping', function() {
    try {
      this.renderBody(this.get('model.body'), this.get('variablesMapping'));
    } catch (error) {
      return error;
    }

    return null;
  }),

  actions: {
    toggleIsEditingHeader: function() {
      this.toggleProperty('isEditingHeader');
    },

    togglePreview: function() {
      this.toggleProperty('showPreview');
    }
  }
});
