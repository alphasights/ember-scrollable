import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-scrollbar', 'Integration | Component | ember scrollbar', {
  integration: true
});

/**
 * TODO TESTCASES
 *
 * - click on the scrollbar when not on handle causes jumping
 * - click and drag on scrollbar space moves the scrollbar (in vertical and horizontal mode), after mouseUp dragging stops
 * - click, move mouse off scrollbar and drag moves the scrollbar, after mouseup dragging should stop.
 *
 */
