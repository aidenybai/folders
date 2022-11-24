let prev = {};
export const effect = (callback) => {
  prev = callback(prev);
};
export const insert = (el, value) => {
  el.textContent = typeof value === 'function' ? value() : value;
};
export const createComponent = (Component, props) => Component(props);
export const template = (html) => {
  const el = document.createElement('template');
  el.innerHTML = html;
  return el.content.firstChild;
};
export const setAttribute = (el, name, value) => el.setAttribute(name, value);
