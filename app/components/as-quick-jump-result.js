import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['type', ':quick-jump-result'],

  type: Ember.computed.oneWay('result.type'),
  id: Ember.computed.oneWay('result.id'),
  path: Ember.computed.oneWay('resultProperties.path'),

  url: function() {
    return `${EmberENV.pistachioUrl}/${this.get('id')}/${this.get('path')}`;
  }.property('id', 'path'),

  title: function() {
    return this.get(`result.${this.get('resultProperties.titlePath')}`);
  }.property('result', 'resultProperties'),

  details: function() {
    return this.get(`result.${this.get('resultProperties.detailsPath')}`);
  }.property('result', 'resultProperties'),

  resultProperties: function() {
    return this.typeProperties[this.get('type')];
  }.property('type'),

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
      path: 'entities'
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
  }
});
