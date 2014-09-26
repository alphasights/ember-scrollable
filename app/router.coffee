`import Ember from 'ember';`
`import config from 'phoenix/config/environment';`

Router = Ember.Router.extend
  location: config.locationType

Router.map (->)

`export default Router;`
