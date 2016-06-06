import Ember from 'ember';
import InboundActionsMixin from 'ember-component-inbound-actions/inbound-actions';
import ScrollableMixin from '../mixins/scrollable';
import layout from '../templates/components/scrollable';

export default Ember.Component.extend(InboundActionsMixin, ScrollableMixin, {
  layout
});
