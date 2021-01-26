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
  beforeChange : function(index){
    var indexPage = index;
    if(indexPage == 0) {
      $('.aside__nav-child').addClass('aside__nav-child_service');
      $('.aside__nav-link--active').css('text-decoration','underline');
    }
    else {
      $('.aside__nav-child').removeClass('aside__nav-child_service');
      $('.aside__nav-link--active').css('text-decoration','none');
    }
  },
  speed : 600,
  startSpeed : null,
  easing : 'ease',
  scrollReset : false,
  pager: true
});


/*docSlider.init({
  beforeChange : function(page){
    var x = page;
    console.log(x);*/
    /*if(x == 0) {
      $('.aside__nav-child').addClass('aside__nav-child_service');
    }
    else {
      $('.aside__nav-child').removeClass('aside__nav-child_service');
    }*/

  /*}
});*/
