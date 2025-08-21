// static/js/menu.js
document.addEventListener('DOMContentLoaded', function () {
  // Get the burger button and the mobile menu
  const burgerButton = document.getElementById('burger-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerIcon = burgerButton.querySelector('i');

  // Check if both elements exist
  if (burgerButton && mobileMenu) {
    // Add a click event listener to the burger button
    burgerButton.addEventListener('click', function () {
      // Toggle the 'is-active' class on the menu
      mobileMenu.classList.toggle('is-active');

      // Change the icon from bars to times (X) and back
      if (mobileMenu.classList.contains('is-active')) {
        burgerIcon.classList.remove('fa-bars');
        burgerIcon.classList.add('fa-times');
        burgerButton.setAttribute('aria-label', 'Close Menu');
      } else {
        burgerIcon.classList.remove('fa-times');
        burgerIcon.classList.add('fa-bars');
        burgerButton.setAttribute('aria-label', 'Open Menu');
      }
    });
  }
});