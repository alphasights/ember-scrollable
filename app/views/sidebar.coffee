`import Ember from 'ember';`

SidebarView = Ember.View.extend
  templateName: 'views/sidebar'
  classNameBindings: [':sidebar', 'isCollapsed:collapsed']
  isCollapsed: false

  actions:
    toggleCollapse: ->
      @set('isCollapsed', !@get('isCollapsed'))

`export default SidebarView;`
