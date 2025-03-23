/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Grid expansion for reviews:
	document.addEventListener('DOMContentLoaded', function () {
		const reviewItems = document.querySelectorAll('.review-item');

		reviewItems.forEach(item => {
			item.addEventListener('click', function () {
				// Close all other dropdowns
				reviewItems.forEach(otherItem => {
					if (otherItem !== item) {
						otherItem.classList.remove('active');
					}
				});

				// Toggle the active class for the clicked item
				this.classList.toggle('active');
			});
		});
	});


	// Scroll Effect
	document.addEventListener('DOMContentLoaded', function () {
		const headerLinks = document.querySelectorAll('#nav a');

		headerLinks.forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault(); // Prevent default anchor behavior

				const targetId = this.getAttribute('href').substring(1); // Get target section ID
				const targetSection = document.getElementById(targetId);

				if (targetSection) {
					const offset = 60; // Adjust for fixed header height
					const targetPosition = targetSection.offsetTop - offset;
					const startPosition = window.pageYOffset;
					const distance = targetPosition - startPosition;
					const duration = 800; // Adjust duration (in milliseconds) for speed
					let startTime = null;

					function scrollAnimation(currentTime) {
						if (startTime === null) startTime = currentTime;
						const timeElapsed = currentTime - startTime;
						const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
						window.scrollTo(0, run);

						if (timeElapsed < duration) {
							requestAnimationFrame(scrollAnimation);
						}
					}

					// Easing function for smooth acceleration and deceleration
					function easeInOutQuad(t, b, c, d) {
						t /= d / 2;
						if (t < 1) return (c / 2) * t * t + b;
						t--;
						return (-c / 2) * (t * (t - 2) - 1) + b;
					}

					requestAnimationFrame(scrollAnimation);
				}
			});
		});
	});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

})(jQuery);