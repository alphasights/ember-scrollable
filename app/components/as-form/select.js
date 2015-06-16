import Ember from 'ember';

export default Ember.Component.extend({
  errorProperty: Ember.computed.oneWay('name'),

  groupedContent: Ember.computed('content.[]', 'optionGroupPath', function() {
    var groupPath = this.get('optionGroupPath');
    var groupedContent = [];
    var content = this.get('content') || [];

    content.forEach(function(item) {
      var option = Ember.Object.create(item);
      var label = option.get(groupPath);

      if (groupedContent.get('lastObject.label') !== label) {
        groupedContent.pushObject({
          label: label,
          content: []
        });
      }

      groupedContent.get('lastObject.content').push(option);
    });

    return groupedContent;
  })
});
