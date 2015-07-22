import Ember from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

export default Ember.Component.extend(InboundActions, {
  classNameBindings: [':email-composer'],
  model: null,
  templates: null,
  selectedTemplate: null,
  isEditingHeader: false,
  showPreview: false,

  personalTemplates: Ember.computed.filterBy('templates', 'global', false),
  globalTemplates: Ember.computed.filterBy('templates', 'global', true),

  initializeDefaults: Ember.on('init', function() {
    if (this.get('templates') == null) {
      this.set('templates', []);
    }
  }),

  variablesMapping: Ember.computed('variables', function() {
    return this.get('variables').reduce(function(result, variable) {
      result[variable.get('key')] = variable.get('value');
      return result;
    }, {});
  }),

  _renderBody: function(body, variablesMapping) {
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
      return this._renderBody(body, this.get('variablesMapping'));
    } else {
      return body;
    }
  }),

  renderedBodyError: Ember.computed('model.body', 'variablesMapping', function() {
    try {
      this._renderBody(this.get('model.body'), this.get('variablesMapping'));
    } catch (error) {
      return error;
    }

    return null;
  }),

  actions: {
    toggleIsEditingHeader: function() {
      this.toggleProperty('isEditingHeader');
    },

    changeSelectedTemplateId: function(templateId) {
      this.sendAction('onChangeSelectedTemplateId', templateId);
    }
  }
});
