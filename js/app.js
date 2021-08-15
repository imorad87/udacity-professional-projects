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
const ACTIVE = "active";
const YOUR_ACTIVE_CLASS = "your-active-class";
let activeSection;
const navBar = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const isInViewport = function (elem) {
  const bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
};

const resetActiveSections = () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.remove(ACTIVE);
    section.classList.remove(YOUR_ACTIVE_CLASS);
  });
};

const resetActiveNavLinks = () => {
  const navLinks = document.querySelectorAll(".menu__link");
  navLinks.forEach((section) => {
    section.classList.remove(ACTIVE);
  });
};

const activateNavLink = (id) => {
  const navLinks = document.querySelectorAll(".menu__link");
  for (const navLink of navLinks) {
    if (navLink.dataset.navto === id) {
      navLink.classList.add(ACTIVE);
      break;
    }
  }
};

const setupEventListeners = () => {
  const navLinks = document.querySelectorAll("a.menu__link");
  for (const navLink of navLinks) {
    console.log(navLink);
    navLink.addEventListener("click", (e) => {
      e.preventDefault();
      const el = document.querySelector(`#${navLink.dataset.navto}`);
      el.scrollIntoView({ behavior: "smooth" });
    });
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
/**
 * @description Extracts the sections of the page and stores them in an array
 * @param {String} tagToExtract - The tag to be searched for content.
 * @returns An object which contains all the section elements in the page along with the data-nav string
 */
function extractContent(tagToExtract) {
  let store = {};
  const elements = document.querySelectorAll(tagToExtract);
  elements.forEach((element) => {
    store[element.id] = element.dataset.nav;
  });
  return store;
}

// build the nav
/**
 * @description Builds the navbar from the provided array
 * @param {Object} store - The object which is used for the storage of the sections of the page.
 */
function buildNav(store) {
  if (store.length <= 0) {
    throw new Error("array is empty");
  }
  // get the object keys and iterate over them to create each nav item using each
  // section's specific data (ex. id and data-nav)
  const ids = Object.keys(store);
  ids.forEach((id) => {
    let item = document.createElement("li");
    item.innerHTML = `<a href="#" class="menu__link" data-navTo="${id}">${store[id]}<a>`;
    navBar.append(item);
  });
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
let store = extractContent("section");
buildNav(store);

// Scroll to section on link click

// Set sections as active

window.addEventListener("scroll", () => {
  const keys = Object.keys(store);
  for (const key of keys) {
    const el = document.querySelector(`#${key}`);
    if (isInViewport(el)) {
      resetActiveSections();
      el.classList.add(ACTIVE);
      el.classList.add(YOUR_ACTIVE_CLASS);
      resetActiveNavLinks();
      activateNavLink(key);
      break;
    }
  }
});

setupEventListeners();
