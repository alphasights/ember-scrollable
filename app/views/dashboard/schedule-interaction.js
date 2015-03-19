import InteractionView from 'phoenix/views/dashboard/interaction';

export default InteractionView.extend({
  classNameBindings: [':schedule-interaction'],

  actions: {
    cancel: function() {
      this.get('controller').send('cancel');
      this.send('close');
    }
  }
});
