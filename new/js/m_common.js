$(document).ready(function(){
	AOS.init({
		 duration: 500,
	});
	
 $(".btn_menu").click(function (e) {
    $(".bg").show();
    $(".btn_close").show();
    $(".nav").stop().animate({
      right: 0
    });
  });

   $(".btn_menu--fixed").click(function (e) {
    $(".bg").show();
    $(".btn_close").show();
    $(".nav").stop().animate({
      right: 0
    });
  });

  $(".btn_close").click(function (e) {
    $(".bg").hide();
    $(".nav").stop().animate({
      right: '-100%'
    });
  });

   $("#gnb > li > a").click(function (e) {
    e.preventDefault();
    var obj = $(this).parent();
    if ($(".sub_menu", obj).css("display") == 'none') {
      $('.sub_menu', obj).slideToggle(300);
      $(obj).addClass('active');
    } else {
      $('.sub_menu', obj).slideToggle(300);
      $(obj).removeClass('active');
    }
  });
  $(".quickBtn").click(function (e) {
	  $(".quickContent").addClass("active");
	  $(".quickContent .quickBtnDimmed").addClass("active");
	  $("body").addClass("quickFixed");
  });
  $(".quickCloseBtn").click(function (e) {
	  $(".quickContent").removeClass("active");
	  $(".quickContent .quickBtnDimmed").removeClass("active");
	  $("body").removeClass("quickFixed");
  });

  $(".quickBtnDimmed").click(function (e) {
	  $(".quickContent").removeClass("active");
	  $(this).removeClass("active");
	  $("body").removeClass("quickFixed");
  });

  
});



$(window).scroll(function () {
	if ($(window).scrollTop() >= 1) { 
	  $(".header-wrap").addClass('fixed');
	} else {
	  $(".header-wrap").removeClass('fixed');
	}
	$(".header-wrap.main.fixed .logo .logo_img").css("opacity",1);
});
