import Ember from 'ember';
import groupByForSelect from 'phoenix/helpers/group-by-for-select';

export default Ember.Component.extend({
  errorProperty: Ember.computed.oneWay('name'),

  groupedContent: Ember.computed('content.[]', 'optionGroupPath', function() {
    var content = this.get('content') || [];

    return groupByForSelect(content, this.get('optionGroupPath'));
  })
});
