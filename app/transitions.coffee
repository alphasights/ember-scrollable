transitions = ->
  @transition(
    @fromNonEmptyModel(),
    @childOf('.quick-jump .actions'),
    @toModel(true),
    @use('toRight'),
    @reverse('toLeft')
  )

`export default transitions;`
