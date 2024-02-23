$(function(){
	AOS.init({
	  duration: 900,
	});

	//main_slider
	$('.main_bg_slider').slick({
		fade: true,
		autoplay:true,
		infinite: true,
		autoplaySpeed:5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover:false,
		pauseOnFocus:false,
		cssEase:'linear',
		asNavFor: '.main_text_slider',
		prevArrow: $('.indicator').find('.prev'),
		nextArrow: $('.indicator').find('.next'),
		
	});
	$('.main_text_slider').slick({
		fade: true,
		autoplay:true,
		infinite: true,
		autoplaySpeed:5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover:false,
		pauseOnFocus:false,
		cssEase:'linear',
		dots: true,
		appendDots: $('.indicator .dot'),
		arrows:false,
		 asNavFor: '.main_bg_slider',
	});

	$('.main_slider').slick('slickPause');
	setTimeout(function() {
	  $('.main_slider').slick('slickPlay');
	}, 1000);

	if(typeof $.fn.Slick === 'undefined'){
		
		$('.main_slider').find('.v1').addClass('on');
		$('.indicator').addClass('on');

		$('.main_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.indicator').removeClass('on');
			$('.main_slider').find('div[class*="v"]').removeClass('on');
			$('.main_slider').find('.v'+(nextSlide+1)).addClass('on');
		});
		$('.main_slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
			$('.indicator').addClass('on');
		});
	}
	
	//슬라이드 재생여부
	$('.status_wrap').find('.status').on('click', function(){
		if($(this).hasClass('play') == true){
			$(this).removeClass('play').addClass('stop');
			$('.main_slider').slick('slickPlay');
		}else {
			$(this).removeClass('stop').addClass('play');
			$('.main_slider').slick('slickPause');
		}
	});
	
	//메인비쥬얼 active
	if(typeof $.fn.Slick === 'undefined'){
		$('.main_slider').find('.v01').addClass('on');
		$('.main_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.main_slider').find('div[class*="v0"]').removeClass('on');
			$('.main_slider').find('.v0'+(nextSlide+1)).addClass('on');
		});
		$('.main_slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
		});
	}



});

$(function(){
	gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

	$( 'body' ).scrollTop( 0 );
	$(".header #gnb").css("opacity","0");
	$("body").css("overflow","hidden");
	$(".main_home .main_bg_slider").css("opacity","0");
	$(".main_home .text_slider_wrap").css("opacity","0");
	$(".header-wrap .logo").css("width","100%");
	$(".header-wrap .logo").css("height","100vh");


	gsap.fromTo(
		$('.header-wrap .logo'),
		{
			yPercent:0,
			opacity:0,
		},
		{
			yPercent:0,
			opacity:1,
			duration: 1,
			ease: "power4.inOut",
			
			
			onComplete: function () {
				gsap.fromTo(
					$('.header-wrap .logo'),
					{
						width: '100%',
						height: '100vh',
						left:0,
						top:0,
					},
					{
						width: '20vw',
						height: '8vw',
						delay: 0.5,
						duration: 0.9,
						left:'4vw',
						top:'3vw',
					}
				);
				gsap.to(window, 0, {
					scrollTo: 0
				  });
				gsap.fromTo(
					$('.header #gnb'),
					{
						yPercent: 25,
						opacity:0,

					},
					{
						yPercent: 0,
						opacity:1,
						delay: 0.8,
						duration: 1,
					}
				);

				gsap.fromTo(
					$('.header .btn_menu'),
					{
						yPercent: 25,
						opacity:0,

					},
					{
						yPercent: 0,
						opacity:1,
						delay: 0.8,
						duration: 1,
					}
				);

				gsap.fromTo(
					$('.quickBtn'),
					{						
						opacity:0,

					},
					{						
						opacity:1,
						delay: 0.8,
						duration: 1,
					}
				);

				gsap.fromTo(
					$('.main_home .main_bg_slider'),
					{
						yPercent: 100,
						opacity:0,

					},
					{
						yPercent: 0,
						opacity:1,
						delay: 0.5,
						duration: 0.9,
					}
				);

				gsap.fromTo(
					$('.main_home .text_slider_wrap'),
					{
						opacity:0,
						yPercent: 100,

					},
					{
						opacity:1,
						yPercent: 0,
						delay: 0.5,
						duration: 0.9,
					}
				);
					

				gsap.fromTo(
					$('body'),
					{
						overflow:'hidden',

					},
					{
						overflow:'visible',
						delay: 0.8,
						duration: 1,
					}
				);
			}
		}
	);

	gsap.to('.orange_bg', {
		duration: 1,
		autoAlpha: 0,
		scrollTrigger: {
			trigger: ".Msection1",
			start: "top top",
			scrub: 1,
			//markers:true,
			end: "bottom bottom",
		}
	});
	let tl_1 = gsap.timeline();
	tl_1.to(".Msection1 .main_bg_slider", { scale: 0.9 }).paused(true);

	ScrollTrigger.create({
		trigger: ".Msection1",
		start: 60,
		end: "bottom",
		//markers: true,
		scrub: 1,
		animation: tl_1
	});

	const swiper = new Swiper('.swiper', {
		slidesPerView: 'auto',
		speed: 800,
		spaceBetween: 30,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		  },
	});

	const swiper2 = new Swiper('.swiper--pop', {
		slidesPerView: 1,
		speed: 800,
		spaceBetween: 0,
	    pagination: {
        el: ".swiper-pagination",
      },
	});

	 
})
