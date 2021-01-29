"use strict";

jQuery(document).ready(function($) {

  Modernizr.on("webp", function(result) {
    if (result) {
      $("body").addClass("webp");
    } else {
      $("body").addClass("no-webp");
    }
  });

});

docSlider.init({
  beforeChange : function(pager) {
    var indexPage = pager;
    console.log(pager);
    if(pager == 0) {
      //$('.aside__nav-child').addClass('aside__nav-child_service');
      $('.aside__nav-link--active').css('text-decoration','underline');
    }
    else {
      //$('.aside__nav-child').removeClass('aside__nav-child_service');
      $('.aside__nav-link--active').css('text-decoration','none');
    }
  },
  speed : 600,
  startSpeed : null,
  easing : 'ease',
  scrollReset : false,
  pager: false
});

$('.about').owlCarousel({
  nav: true,
  loop: false,
  dots: false,
  margin: 0,
  responsive: {
    1200: {
      items: 1
    }
  },
  navText: [
    '<span class="nav-owl-btn nav-owl-btn_left"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>',
    '<span class="nav-owl-btn nav-owl-btn_right"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>'
  ]
});

/*$('#page-3').owlCarousel({
  nav: true,
  loop: false,
  dots: false,
  margin: 0,
  responsive: {
    1200: {
      items: 1
    }
  },
  navText: [
    '<span class="nav-owl-btn nav-owl-btn_left"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>',
    '<span class="nav-owl-btn nav-owl-btn_right"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>'
  ]
});*/

$('.exeprt-carousel').owlCarousel({
  nav: true,
  loop: false,
  dots: false,
  margin: 0,
  responsive: {
    1200: {
      items: 1
    }
  },
  navText: [
    '<span class="nav-owl-btn nav-owl-btn_left"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>',
    '<span class="nav-owl-btn nav-owl-btn_right"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>'
  ]
});

$('.planning-carousel').owlCarousel({
  nav: true,
  loop: false,
  dots: false,
  margin: 0,
  responsive: {
    1200: {
      items: 1
    }
  },
  navText: [
    '<span class="nav-owl-btn nav-owl-btn_left"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>',
    '<span class="nav-owl-btn nav-owl-btn_right"><svg class="nav-owl-btn nav-owl-btn_left nav-owl-icon" width="15" height="15"><use xlink:href="#left-chevron"></use></svg></span>'
  ]
});

$('.objects').owlCarousel({
  nav: true,
  loop: false,
  dots: false,
  margin: 0,
  responsive: {
    1200: {
      items: 1
    }
  }/*,
  navText: [
    '<span class=""><svg class="" width="127" height="15"><use xlink:href="#object-left"></use></svg></span>',
    '<span class=""><svg class="" width="127" height="15"><use xlink:href="#object-right"></use></svg></span>'
  ]*/
});
