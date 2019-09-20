//for navigation
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if (element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if ($(window).scrollTop() != scroll_to) {
		$('html, body')
			.stop()
			.animate({ scrollTop: scroll_to }, 1000);
	}
}

jQuery(document).ready(function() {
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});
	// toggle "navbar-no-bg" class
	$('.top-content .text').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});
	$('#detail').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});

	/*
        Background slideshow
    */

	$('#index').backstretch('assets/img/backgrounds/3.jpg');
	$(' #all').backstretch('assets/img/backgrounds/1.jpg');
	$(' #profile').backstretch('assets/img/backgrounds/2.jpg');
	// $(' #detail').backstretch('assets/img/backgrounds/4.jpg');

	$('#top-navbar-1').on('shown.bs.collapse', function() {
		$('.top-content').backstretch('resize');
	});
	$('#top-navbar-1').on('hidden.bs.collapse', function() {
		$('.top-content').backstretch('resize');
	});

	/*
        Wow
    */
	new WOW().init();
});
