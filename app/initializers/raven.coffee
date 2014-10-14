`import config from '../config/environment'`

RavenInitializer =
  name: 'raven'

  initialize: ->
    Raven.config(config.APP.raven.url, {
      whitelistUrls: config.APP.raven.whitelistUrls
    }).install()

`export default RavenInitializer`
