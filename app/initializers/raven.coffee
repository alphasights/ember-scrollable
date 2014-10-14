`import config from '../config/environment'`

RavenInitializer =
  name: 'raven'

  initialize: ->
    Raven.config(config.APP.raven.url, {
      whitelistUrls: config.APP.raven.whitelistURLs
    }).install()

`export default RavenInitializer`
