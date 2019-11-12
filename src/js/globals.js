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

function createElement(type, props = {}, contents) {
  const elem = document.createElement(type);
  Object.keys(props).forEach((key) => {
    elem[key] = props[key];
  });

  if (contents) {
    if (typeof contents === 'function') {
      elem.append(...contents(elem));
    } else {
      elem.append(...contents);
    }
  }

  return elem;
}

const createDiv = createElement.bind(null, 'div'); // Curry function
const createHead1 = createElement.bind(null, 'h1'); // Curry function
const createHead2 = createElement.bind(null, 'h2'); // Curry function
const createHead3 = createElement.bind(null, 'h3'); // Curry function
const createParagraph = createElement.bind(null, 'p'); // Curry function
const createImg = createElement.bind(null, 'img'); // Curry function

export {
  warn,
  qSelect,
  toggleClass,
  createElement,
  createDiv,
  createHead1,
  createHead2,
  createHead3,
  createParagraph,
  createImg,
};
