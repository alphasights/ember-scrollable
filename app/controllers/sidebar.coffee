`import Ember from 'ember'`

SidebarController = Ember.Controller.extend
  needs: ['application']
  currentUser: Ember.computed.alias('controllers.application.currentUser')

`export default SidebarController`
