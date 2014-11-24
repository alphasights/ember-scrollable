export default function() {
  this.transition(
    this.fromRoute('team.index'),
    this.toRoute('teamProject.index'),
    this.use('showSidePanel'),
    this.reverse('hideSidePanel')
  );
}
