const elem = (tag) => document.createElement(tag);
const grab = (tag) => document.querySelector(tag);
const chilrenArr = (parent) => Array.from(parent.children);

// const addClass = R.curry((className, element) => {
// 	element.classList.add(className);
// 	return element;
// });
// const addId = R.curry((idName, element) => {
// 	element.classList.add(className);
// 	return element;
// });
const attr = R.curry((attrName, attrVal, element) => {
	element.setAttribute(attrName, attrVal);
	return element;
});
const append = R.curry((node, element) => {
	element.appendChild(node);
	return element;
});

const setInnerHTML = R.curry((content, element) => {
	element.innerHTML = content;
	return element;
});
const setContent = R.curry((content, element) => {
	element.textContent = content;
	return element;
});
const setGridTemplate = R.curry((value, element) => {
	element.style.setProperty('--sideLength', value);
	return element;
});

const on = R.curry((eventType, fn, element) =>
	element.addEventListener(eventType, fn),
);
const off = R.curry((eventType, fn, element) =>
	element.removeEventListener(eventType, fn),
);
