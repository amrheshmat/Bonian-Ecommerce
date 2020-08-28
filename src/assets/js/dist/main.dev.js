"use strict";

$(document).ready(function () {
  //navbar cart carousel
  navbarCarousel(); //on rtl

  languageSwitcherEffects(); //Adjust Header Height

  adjustHeaderHeight(); //navbar styles on scroll
  // customizeNavbarOnScroll()
  //search bar on mobile apperance

  searchBarOnMobile(); // scroll top to section

  animateToSection(); //Adjust Devdevider Position

  devdeviderPosition(); //animate to head (button)

  animateToHeadButton(); //spinner remover

  removeSpinner(); //textare Calculation

  textareCalculation(); //animate to head (function)

  animateToHead(); //reset navbar from medium screens

  resetNavbar(); //owl Carousel Trigger()

  owlCarouselTrigger(); //rotate nav bar toggler

  navBarTogglerRotation();
  /*(F) first and last word function*/

  firstAndLastWord(); //window resize functions

  $(window).resize(function () {
    adjustHeaderHeight();
    devdeviderPosition();
  }); //window scrolling functions

  $(window).scroll(function () {
    devdeviderPosition(); // customizeNavbarOnScroll()

    animateToHeadButton();
  }); //adjust payment method

  showPaymentMethod(); //activat category from aside

  selectCategoryFromAside(); //show password in login form

  showPassword();
});