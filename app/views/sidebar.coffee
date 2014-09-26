`import Ember from 'ember';`

SidebarView = Ember.View.extend
  templateName: 'views/sidebar'
  classNameBindings: [':sidebar', 'isCollapsed:collapsed']
  isCollapsed: false

  actions:
    toggleCollapse: ->
      @set('isCollapsed', !@get('isCollapsed'))

  isCollapsedDidChange: (->
    if @get('isCollapsed')
      growth = '-= 190px'
    else
      growth = '+= 190px'

    @$().velocity({
      width: growth
    }, {
      duration: 150
    })
  ).observes('isCollapsed')

`export default SidebarView;`
