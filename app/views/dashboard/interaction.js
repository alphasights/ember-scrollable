import SidePanelView from 'phoenix/views/side-panel';
import NavigationArrowsMixin from 'phoenix/mixins/navigation-arrows';

export default SidePanelView.extend(NavigationArrowsMixin, {
  classNameBindings: [':interaction']
});
