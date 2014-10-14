`import DS from 'ember-data'`
`import config from '../config/environment'`

ApplicationAdapter = DS.ActiveModelAdapter.extend
  host: config.APP.apiBaseUrl

`export default ApplicationAdapter`
