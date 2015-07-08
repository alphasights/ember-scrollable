import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['type', ':quick-jump-result', 'isFocused:focused'],

  type: Ember.computed.oneWay('result.type'),
  id: Ember.computed.oneWay('result.id'),
  path: Ember.computed.oneWay('resultProperties.path'),

  url: Ember.computed('id', 'path', function() {
    return `${EmberENV.pistachioUrl}/${this.get('path')}/${this.get('id')}`;
  }),

  title: Ember.computed('result', 'resultProperties', function() {
    return this.get(`result.${this.get('resultProperties.titlePath')}`);
  }),

  details: Ember.computed('result', 'resultProperties', function() {
    return this.get(`result.${this.get('resultProperties.detailsPath')}`);
  }),

  resultProperties: Ember.computed('type', function() {
    return this.typeProperties[this.get('type')];
  }),

  registerWithRoot: Ember.on('didInsertElement', function() {
    this.get('root.resultComponents').pushObject(this);
  }),

  unregisterWithRoot: Ember.on('willDestroyElement', function() {
    this.get('root.resultComponents').removeObject(this);
  }),

  isFocused: Ember.computed('root.focusedComponent', function() {
    return this.get('root.focusedComponent') === this;
  }),

  typeProperties: {
    account: {
      titlePath: 'name',
      path: 'client/accounts'
    },

    advisor: {
      titlePath: 'name',
      detailsPath: 'bestPosition',
      path: 'advisors'
    },

    contact: {
      titlePath: 'name',
      detailsPath: 'accountName',
      path: 'client/contacts'
    },

    entity: {
      titlePath: 'name',
      path: 'client/entities'
    },

    project: {
      titlePath: 'codename',
      detailsPath: 'externalTitle',
      path: 'projects'
    },

    target: {
      titlePath: 'name',
      path: 'client/targets'
    },

    user: {
      titlePath: 'name',
      detailsPath: 'teamName',
      path: 'faces'
    }
  },

  actions: {
    visit: function() {
      window.open(this.get('url'));
    }
  }
});
