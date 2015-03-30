import Ember from 'ember';
import KeyEventsMixin from 'phoenix/mixins/key-events';
import NavigationArrowsMixin from 'phoenix/mixins/navigation-arrows';

export default Ember.Component.extend(KeyEventsMixin, NavigationArrowsMixin, {
  classNameBindings: [':side-panel', 'isActive:active'],
  tagName: 'article',

  initialWidth: null,

  onDidInsertElement: function() {
    this.set('isActive', true);
    this.set('initialWidth', this.$('> div').width());

    this.$('> div').velocity({
      right: 0
    }, {
      duration: 200
    });

    // TODO: Figure out why using the Ember `click` instance method resulted in
    // the event handler to be called twice.
    this.$().on('click', function(event) {
      var $target = Ember.$(event.target);
      var $nonBlurringElements = this.$('> div');

      if($target.closest($nonBlurringElements).length === 0) {
        this.send('close');
      }
    }.bind(this));
  }.on('didInsertElement'),

  actions: {
    close: function() {
      this.set('isActive', false);

      this.$('> div').velocity({
        right: `-${this.get('initialWidth')}px`
      }, {
        duration: 200,

        complete: (() => {
          this.sendAction('close');
        })
      });
    }
  },

  keyEvents: {
    esc: function() {
      this.send('close');
    }
  }
});
