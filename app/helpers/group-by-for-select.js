import Ember from 'ember';

export default function(items, key) {
  var groupedContent = [];

  items.forEach(function(_item) {
    var item;

    if (typeof _item.get !== 'undefined') {
      item = _item;
    } else {
      item = Ember.Object.create(_item);
    }

    var label = item.get(key);

    if (groupedContent.get('lastObject.label') !== label) {
      groupedContent.pushObject({
        label: label,
        content: []
      });
    }

    groupedContent.get('lastObject.content').push(item);
  });

  return groupedContent;
}
