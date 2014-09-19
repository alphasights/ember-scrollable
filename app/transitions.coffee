transitions = ->
  @transition(
    @fromNonEmptyModel(),
    @childOf('.quick-jump .actions'),
    @hasClass('liquid-actions'),
    @toModel(true),
    @use('toRight'),
    @reverse('toLeft')
  )

`export default transitions;`
