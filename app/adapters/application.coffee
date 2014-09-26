`import DS from 'ember-data';`
`import config from 'phoenix/config/environment';`

console.log config

ApplicationAdapter = DS.ActiveModelAdapter.extend
  host: config.APP.apiBaseURL

`export default ApplicationAdapter;`
