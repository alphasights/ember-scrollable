/**
 * Polyfills for `Number` global.
 */
export default {
  isNaN: Number.isNaN || window.isNaN,
  parseInt: Number.parseInt || window.parseInt,
};
