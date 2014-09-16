transitions = ->
  @transition(
    @fromNonEmptyModel(),
    @childOf('.application > header .quick-jump .actions'),
    @toModel(true),
    @use('toRight'),
    @reverse('toLeft')
  )

`export default transitions;`
