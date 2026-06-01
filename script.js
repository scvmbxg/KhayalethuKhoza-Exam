// Main UI script: menu toggle and scroll spy
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

// Toggle mobile menu
if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  });
}

// Theme toggle: persist choice in localStorage
const themeToggle = document.querySelector("#theme-toggle");
const rootEl = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") rootEl.classList.add("dark");
  else rootEl.classList.remove("dark");
}

// initialize from localStorage
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = rootEl.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    // update icon
    const icon = themeToggle.querySelector("i");
    if (icon) icon.className = isDark ? "bx bx-sun" : "bx bx-moon";
    localStorage.setItem("theme", newTheme);
  });
  // set initial icon
  const initialIcon = themeToggle.querySelector("i");
  if (initialIcon)
    initialIcon.className = savedTheme === "dark" ? "bx bx-sun" : "bx bx-moon";
}

// Scroll spy: highlight nav link for the section in view
window.addEventListener("scroll", () => {
  const top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const selector = `header nav a[href*="#${id}"]`;
      const activeLink = document.querySelector(selector);
      if (activeLink) activeLink.classList.add("active");
    }
  });

  // close mobile menu when scrolling
  if (menuIcon && navbar) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  }
});
