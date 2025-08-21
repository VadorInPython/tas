// static/js/menu.js
document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  const burgerButton = document.getElementById("burger-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerIcon = burgerButton.querySelector("i");
  const body = document.body; // Get the body element

  // Check if all elements exist
  if (burgerButton && mobileMenu && body) {
    // Add a click event listener to the burger button
    burgerButton.addEventListener("click", function () {
      // Toggle the 'is-active' class on the menu
      mobileMenu.classList.toggle("is-active");

      // === FIX: Toggle the 'menu-open' class on the body to prevent scrolling ===
      body.classList.toggle("menu-open");

      // Change the icon from bars to times (X) and back
      if (mobileMenu.classList.contains("is-active")) {
        burgerIcon.classList.remove("fa-bars");
        burgerIcon.classList.add("fa-times");
        burgerButton.setAttribute("aria-label", "Close Menu");
      } else {
        burgerIcon.classList.remove("fa-times");
        burgerIcon.classList.add("fa-bars");
        burgerButton.setAttribute("aria-label", "Open Menu");
      }
    });
  }
});