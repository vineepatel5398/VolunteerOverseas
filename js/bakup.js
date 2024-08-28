$(window).on("load",function() {

  if ($(window).scrollTop() > 0) {    
     $("header").addClass('small-header');      
   } else { 
     $("header").removeClass('small-header'); 
    }
});

$(document).ready(function() {

  $( "#custom-date" ).datepicker();
  
  $(".custom_dropdown").dropkick({
      mobile: true
  });

  footerAdj();
  buttonOnClick();
  hideShowHeader();
  owlCarousel();

});

function footerAdj() {
    var footerH = $("footer").outerHeight();
    $("footer").css({ "margin-top": -footerH });
    $(".wrapper").css({ "padding-bottom": footerH });
}
  
function buttonOnClick(){

  $(".search-button").click(function(){
    $(".more-filters").stop(true,true).slideToggle("slow");
    if ($(window).width() < 768) {
     $(".filter-row").slideUp("slow");
    }
    $("html, body").toggleClass("filter");
    $("html, body").removeClass("edit-button-filter");
 });

  $(".edit-button").click(function(){
    $(".filter-row").stop(true,true).slideToggle("slow");
    $(".more-filters").slideUp("slow");
    $("html, body").removeClass("filter");
    $("html, body").toggleClass("edit-button-filter");
  });

  $(".close-button").click(function(){
    $(".more-filters").slideUp("slow");
    $("html, body").toggleClass("filter");
  });

  $(".navbar-toggler").click(function(){
    $(".navbar-collapse").stop(true,true).slideToggle();
    $("html, body").toggleClass("filter");
  });

  $(".form-application-btn").click(function(){
    $(".right-column-info").stop(true,true).slideToggle("slow ");
    $("html, body").toggleClass("form-button-filter");
    $("html, body").animate({
        scrollTop: $(".right-column-info").offset().top
    }, "slow");
  });

  $(".form-apply-btn").click(function(){
    if ($(window).width() < 1023) {
     $(".right-column-info").slideUp("slow");
     $("html, body").toggleClass("form-button-filter ");
    }
  });

  $(".view-photos-buttton").click(function(){
    $(".view-photos-div").stop(true,true).slideToggle("slow");
    $("html, body").toggleClass("view-photos-filter");
  });

  $(".view-photos-close-btn").click(function(){
    $(".view-photos-div").slideUp("slow");
    $("html, body").toggleClass("view-photos-filter");
  });
}

function hideShowHeader(){
  $(window).scroll(function() { 
    
   if ($(window).scrollTop() > 0) {    
     $("header").addClass('small-header');      
   } else { 
     $("header").removeClass('small-header'); 
    }
  });
}

function owlCarousel(){

  $('.table-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    responsive:{
      0:{
       items:2
        },
    600:{
       items:3
        },
   1000:{
      items:4
        }
        }
  });

  viewphotsowlcarousel();

  $('.project-owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
      0:{
        items:1
    },
    600:{
        items:2
    },
    1024:{
        items:3
    },
    1440:{
        items:4
    }
    }
  });

  $('.feature-owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
      0:{
        items:2
    },
    600:{
        items:3
    },
    1024:{
        items:5
    },
    1440:{
        items:6 
    }
    }
  });

  $('.afford-owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
      0:{
        items:1
    },
    600:{
        items:3
    },
    1024:{
        items:4
    },
    1440:{
        items:5 
    }
    }
  });

  $('.owl-carousel-search').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
      0:{
        items:1
    },
    600:{
        items:1
    },
    1000:{
        items:1
    }
    }
  });
}

function viewphotsowlcarousel(){

  var sync1 = $(".view-photoes-main-image");
  var sync2 = $(".view-photoes-small-images");
  // var slidesPerPage = 1; //globaly define number of elements per page
  var syncedSecondary = true;

  setTimeout(function(){
  sync1.owlCarousel({
    items : 1,
    // slideSpeed : 4000,
    nav: true,
    // autoplay: true,
    // autoplayHoverPause:true,
    dots: true,
    loop: true,
    responsiveRefreshRate : 200,
  }).on('changed.owl.carousel', syncPosition);


  sync2.owlCarousel({
    margin:0,
    nav:true,
    responsive:{
      0:{
       items:2
        },
    600:{
       items:3
        },
   1024:{
       items:4
        },
   1200:{
      items:5
        }
        }
  });

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    dots: true,
    nav: true,
    // loop:true,
    smartSpeed: 200,
    slideSpeed : 500,
    // slideBy: 1, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);
  
  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    // var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    
    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
  },70);
}

$(window).resize(function(){
    footerAdj();
});