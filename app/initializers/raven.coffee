RavenInitializer =
  name: 'raven'
  initialize: ->
    Raven.config('https://665338a0e51643adb0c51f05dda5c368@app.getsentry.com/31225', {
      whitelistUrls: ['as-phoenix-production.herokuapp.com', 'as-phoenix-staging.herokuapp.com']
    }).install()

`export default RavenInitializer`
