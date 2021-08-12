/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
var navBar = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

const extractContent = (tagToExtract) => {
  var store = [];
  var elements = document.querySelectorAll(tagToExtract);
  elements.forEach((element) => {
    store.push(element.id);
  });
  return store;
};

// build the nav

const buildNav = (store) => {
  store.forEach((key) => {
    var item = document.createElement("li");
    item.innerHTML = `<a href="#${key}">${key}<a>`;
    navBar.append(item);
  });
};

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
var store = extractContent("section");
buildNav(store);

// Scroll to section on link click

// Set sections as active
