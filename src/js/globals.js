export const DEFAULT_PROJECT_NAME = 'default';

// eslint-disable-next-line no-console
const warn = console.log.bind(console);
const qSelect = document.querySelector.bind(document);

function toggleClass(reference, newClass, classes = []) {
  const element = (typeof reference === 'string') ? qSelect(reference) : reference;
  classes.forEach((cls) => {
    if (cls !== newClass) {
      element.classList.remove(cls);
    }
  });
  element.classList.add(newClass);
}

function createElement(type, props = {}, setup = null) {
  const elem = document.createElement(type);
  Object.keys(props).forEach((key) => {
    elem[key] = props[key];
  });
  if (setup) {
    setup(elem);
  }
  return elem;
}

const createDiv = createElement.bind(null, 'div'); // Curry function

export {
  warn,
  qSelect,
  toggleClass,
  createElement,
  createDiv,
};
