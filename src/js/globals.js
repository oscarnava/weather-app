export const DEFAULT_PROJECT_NAME = 'default';

// eslint-disable-next-line no-console
const warn = console.log.bind(console);
const qSelect = document.querySelector.bind(document);

const toggleClass = (reference, newClass, classes = []) => {
  const element = (typeof reference === 'string') ? qSelect(reference) : reference;
  classes.forEach((cls) => {
    if (cls !== newClass) {
      element.classList.remove(cls);
    }
  });
  element.classList.add(newClass);
}

const createElement = (type, props = {}, contents) => {
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

// Curried functions
const createDiv = createElement.bind(null, 'div');
const createHead1 = createElement.bind(null, 'h1');
const createHead2 = createElement.bind(null, 'h2');
const createHead3 = createElement.bind(null, 'h3');
const createParagraph = createElement.bind(null, 'p');
const createImg = createElement.bind(null, 'img');

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
