transitions = ->
  @transition(
    @fromNonEmptyModel(),
    @childOf('.quick-jump .actions'),
    @hasClass('liquid-actions'),
    @toModel(true),
    @use('fade'),
    @reverse('fade')
  )

`export default transitions;`
