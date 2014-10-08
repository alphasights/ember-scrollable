`import DS from 'ember-data'`
`import config from '../config/environment'`

ApplicationAdapter = DS.ActiveModelAdapter.extend
  host: config.APP.apiBaseURL

`export default ApplicationAdapter`
