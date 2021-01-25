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
