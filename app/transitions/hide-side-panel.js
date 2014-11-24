import { animate, stop } from 'liquid-fire';

export default function fade(oldView, insertNewView) {
  stop(oldView);

  oldView.set('isActive', false);

  return animate(oldView.$('> div'), {
    right: `-${oldView.get('initialWidth')}px`
  }).then(insertNewView);
}
