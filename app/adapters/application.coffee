`import DS from 'ember-data'`

ApplicationAdapter = DS.ActiveModelAdapter.extend
  host: PhoenixENV.APP.apiBaseURL

  ajax: (url, method, options = {}) ->
    @_super(url, method, _(options).extend(
      xhrFields:
        withCredentials: true
    ))

`export default ApplicationAdapter`
