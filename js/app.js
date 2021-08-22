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
const ACTIVE_SECTION = "active-section";
const navBar = document.querySelector("#navbar__list");
const backToTopButton = document.querySelector("#button");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * Check if the given element is currently displayed on the view.
 * @param {*} elem the element to check
 *
 */
const isInViewport = function (elem) {
  const bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth;
};

/**
 * Reset the active state for each section
 */
const resetActiveSections = () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.remove(ACTIVE);
    section.classList.remove(ACTIVE_SECTION);
  });
};

/**
 * Reset the active state for each link
 */
const resetActiveNavLinks = () => {
  const navLinks = document.querySelectorAll(".menu__link");
  navLinks.forEach((navLink) => {
    navLink.classList.remove(ACTIVE);
  });
};

/**
 * Sets a nav link as active. the nav link is selected based on the provided id
 * @param {string} id the id for the item to be set as active.
 * The id is the id of the active section that is displayed on the viewport
 */
const activateNavLink = (id) => {
  resetActiveNavLinks();
  const navLinks = document.querySelectorAll(".menu__link");
  for (const navLink of navLinks) {
    if (navLink.dataset.navto === id) {
      navLink.classList.add(ACTIVE);
      break;
    }
  }
};

/**
 * setup up navLink listeners to handle the click event
 * which is going to scroll to a specific sections based of the data attribute
 */
const setupLinkClickListener = () => {
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

/*
 * Handle the back top top button. add an event listener to the scroll event and if the
 * window is scrolled a button will show up on the bottom right corner of the screen
 * and an event listener will be added to the button to scroll back to the top of the page
 */
const backToTopHandler = () => {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
    });
  });
};

/**
 * show/hide the responsive menu when the screen size is mobile
 */
const responsiveMenuButtonHandler = () => {
  const menuButton = document.querySelector(".menuButton");
  const nav = document.querySelector(".navbar__menu");
  menuButton.addEventListener("click", () => nav.classList.toggle("active"), false);
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
    throw new Error("no data to display");
  }
  // get the object keys and iterate over them to create each nav item using each
  // section's specific data (ex. id and data-nav)
  const ids = Object.keys(store);
  console.log(ids.length);
  ids.forEach((id) => {
    const item = document.createElement("li");
    item.innerHTML = `<a href="#" class="menu__link" data-navTo="${id}">${store[id]}<a>`;
    navBar.appendChild(item);
  });
}

// Add class 'active' to section when near top of viewport
const setupActiveSectionListener = () => {
  window.addEventListener("scroll", () => {
    const keys = Object.keys(store);
    for (const key of keys) {
      const el = document.querySelector(`#${key}`);
      if (isInViewport(el)) {
        resetActiveSections();
        el.classList.add(ACTIVE);
        el.classList.add(ACTIVE_SECTION);
        activateNavLink(key);
        break;
      }
    }
  });
};
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
setupLinkClickListener();

// Set sections as active
setupActiveSectionListener();

//back to top button handler
backToTopHandler();

//show/hide navBar when on mobile
responsiveMenuButtonHandler();
