`import DS from 'ember-data';`

ApplicationAdapter = DS.ActiveModelAdapter.extend
  host: PhoenixENV.APP.apiBaseURL

`export default ApplicationAdapter;`
