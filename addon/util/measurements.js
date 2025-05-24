/**
 * Replacement for jQuery $.height()
 * Borrowed with thanks from https://github.com/nefe/You-Dont-Need-jQuery#2.2
 */
export function getHeight(el) {
  let styles = window.getComputedStyle(el);
  let height = el.offsetHeight;
  let borderTopWidth = parseFloat(styles.borderTopWidth);
  let borderBottomWidth = parseFloat(styles.borderBottomWidth);
  let paddingTop = parseFloat(styles.paddingTop);
  let paddingBottom = parseFloat(styles.paddingBottom);
  return (
    height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom
  );
}
/**
 * Replacement function for jQuery $.width()
 * Borrowed with thanks from https://github.com/nefe/You-Dont-Need-jQuery#2.2
 */
export function getWidth(el) {
  let styles = window.getComputedStyle(el);
  let width = el.offsetWidth;
  let borderLeftWidth = parseFloat(styles.borderLeftWidth);
  let borderRightWidth = parseFloat(styles.borderRightWidth);
  let paddingLeft = parseFloat(styles.paddingLeft);
  let paddingRight = parseFloat(styles.paddingRight);
  return (
    width - borderLeftWidth - borderRightWidth - paddingRight - paddingLeft
  );
}
