export default {
  name: 'messenger',

  initialize: function() {
    Messenger.options = {
      theme: 'block',
      extraClasses: 'notification messenger-fixed messenger-on-top messenger-on-right'
    };
  }
};
