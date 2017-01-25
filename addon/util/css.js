import Ember from 'ember';

const {isEmpty, String: {htmlSafe}} = Ember;

function styleify(obj) {
  if (isEmpty(obj)) {
    return htmlSafe('');
  }
  const styles = Object.keys(obj).reduce((styleString, key) => {
    const styleValue = obj[key];
    if (!isEmpty(styleValue)) {
      styleString += `${key}: ${styleValue}; `;
    }
    return styleString;
  }, '');
  return htmlSafe(styles);

}

export {styleify};
