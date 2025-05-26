"use strict";

$(document).ready(function () {
  // $(".counter").counterUp({
  //   delay: 10,
  //   time: 1000,
  //   offset: 100,
  // });

  var visualSwiper2 = new Swiper(".swiper-visual-pagination", {
    loop: true,
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 4,
    slidesPerGroup: 1,
    loopedSlides: 4,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
  });

  var visualSwiper = new Swiper(".swiper-visual", {
    loop: true,
    effect: "fade",
    spaceBetween: 10,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loopedSlides: 4,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".ms1 .swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".ms1 .swiper-button-next",
      prevEl: ".ms1 .swiper-button-prev",
    },
  });
  
  visualSwiper.controller.control = visualSwiper2;
  visualSwiper2.controller.control = visualSwiper;

  // 임시코드
  let cloneSlide = $('.swiper-news .swiper-wrapper').html();
  let arraySlide = [];
  let newsSwiper; 

  $('.swiper-news .swiper-slide').each(function(i, e) {
    arraySlide.push(e);
  });

  $('.news-control .cate a').on('click', function(e) {
    e.preventDefault();
    newsSwiper.destroy();

    const type = $(this).text();
    
    $(this).addClass('on').parent().siblings().find('.on').removeClass('on');
    $('.swiper-news .swiper-wrapper').empty();
  
    if (type === '전체') {
      $('.swiper-news .swiper-wrapper').append(cloneSlide);
    } else {
      $(arraySlide).each(function(i, e) {
        const exist = $(e).attr('data-type').indexOf(type);
  
        if (exist >= 0) {
          $('.swiper-news .swiper-wrapper').append(e);
        }
      });
    }
    swiperInit();
    newsSwiper.autoplay.stop();
    $('.news-control .btn-swiper-play').addClass('on');
  });
  swiperInit();

  function swiperInit() {
    newsSwiper = new Swiper(".swiper-news", {
        slideToClickedSlide: true,
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: 1.15,
        spaceBetween: -50,
        breakpoints: {
          1280: {
            slidesPerView: 6,
            spaceBetween: -170,
          },
          1023: {
            slidesPerView: 5,
            spaceBetween: -150,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: -120,
          },
        },
        pagination: {
          el: ".ms2 .swiper-pagination",
          type: "fraction",
        },
        on: {
            beforeInit: slideClone(),
            init: function(){
            },
            slideChange: function(instance){
                swiperPaginationLoop(instance);
            },
            update: function() {
                this.slideTo(0);
            }
        },
        navigation: {
          nextEl: ".ms2 .swiper-button-next",
          prevEl: ".ms2 .swiper-button-prev",
        },
    });
  }

  function slideClone(){
    var swiperWrapper = $('.swiper-news .swiper-wrapper');
    var slides = swiperWrapper.find('.swiper-slide');
  
    for (var i = 0; i < slides.length; i++) {
      var clone = slides[i].cloneNode(true);
      swiperWrapper.append(clone);
    }

    for (var i = 0; i < slides.length; i++) {
        var clone = slides[i].cloneNode(true);
        swiperWrapper.append(clone);
    }
  } 

  function swiperPaginationLoop(instance){
    var currentIndex = instance.realIndex; 
    var loopedSlides = instance.slides.length / 2; 
  
    if (currentIndex >= loopedSlides) {
      currentIndex -= loopedSlides; 
    }
  }
  //---
  
  $(document).on('click', '.swiper-news .swiper-slide a', function(e){
    e.stopPropagation();

  })

  
  $(document).on('click', '.visual-wrp .swiper-slide, .swiper-news .swiper-slide', function(e){

    var $palyBtn = $(this).closest('.main-section').find('.btn-swiper-play');

    if(!$palyBtn.hasClass('on')){
        $palyBtn.click();
    } else {
        return false;
    }
  })

  $(".btn-swiper-play").on("click", function (e) {
    var $t = $(this),
      $tg = $(this).data("target");

    $t.toggleClass("on");

    switch ($tg) {
      case "swiper-news":
        if ($(this).hasClass("on")) {
            newsSwiper.autoplay.stop();
        } else {
            newsSwiper.autoplay.start();
        };
        break;
      case "swiper-visual":
        if ($(this).hasClass("on")) {
            visualSwiper.autoplay.stop();
        } else {
            visualSwiper.autoplay.start();
        }
        break;
      default:
        break;
    }
  });

  // ms5
  $(document).on('click', '.circle-list .link', function(e){	
        e.preventDefault();

        var t = $(this),
            $index = t.parent().index();

        $(this).closest('.main-section').prepend('<a class="dim" data-toggle="circle-layer-close"><i class="sr-only">close</i></a>').addClass('open');

        $('.circle-layer-list > div').eq($index).addClass('active');
        $('body').addClass('circle-layer-open');

        let isMobile = window.matchMedia("(max-width: 768px)");
        if(!isMobile.matches){
            $('html').animate({scrollTop: $(this).closest('.main-section').offset().top - 20}, 300)
        }

        $('.circle-layer-list').append('<button class="btn-close" data-toggle="circle-layer-close"><i class="icon-close">close</i></button>')
    });

	$(document).on('click', '[data-toggle=circle-layer-close]', function(){
        $(this).closest('.main-section').removeClass('open').find('.dim').remove();
		$('.circle-layer-list').find('.btn-close').remove().end().find('.active').removeClass('active');
        $('body').removeClass('circle-layer-open');
	});
});
