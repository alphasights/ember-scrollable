import { animate, stop } from 'liquid-fire';

export default function fade(oldView, insertNewView) {
  stop(oldView);

  return insertNewView().then(function(newView) {
    newView.set('isActive', true);

    return animate(newView.$('> div'), {
      right: 0
    });
  });
}
