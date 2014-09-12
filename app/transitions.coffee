transitions = ->
  @transition(
    @fromNonEmptyModel(),
    @childOf('.application > header .actions .toggles'),
    @toModel(true),
    @use('toRight'),
    @reverse('toLeft')
  )

`export default transitions;`
