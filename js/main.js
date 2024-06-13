window.onload = function() {
	handleMarquee();
    initNav();
	controlVideo();
	rollingAds();
}


// https://www.w3docs.com/snippets/css/how-to-have-the-marquee-effect-without-using
// -the-marquee-tag-with-css-javascript-and-jquery.html#example-of-creating-a-marquee-
// effect-with-javascript-20
function handleMarquee() {
	const marquee = document.querySelectorAll('.marquee');
	let speed = 1;
	let lastScrollPos = 0;
	let timer;
	marquee.forEach(function(el) {
		const container = el.querySelector('.inner');
		const content = el.querySelector('.inner > *');
		//Get total width
		const elWidth = content.offsetWidth;
		//Duplicate content
		let clone = content.cloneNode(true);
		container.appendChild(clone);
		let progress = 1;

		function loop() {
			progress = progress - speed;
			if (progress <= elWidth * -1) {
				progress = 0;
			}
			container.style.transform = 'translateX(' + progress + 'px)';
			container.style.transform += 'skewX(' + speed * 0.4 + 'deg)';
			window.requestAnimationFrame(loop);
		}
		loop();
	});
	window.addEventListener('scroll', function() {
		const maxScrollValue = 12;
		const newScrollPos = window.scrollY;
		let scrollValue = newScrollPos - lastScrollPos;
		if (scrollValue > maxScrollValue) scrollValue = maxScrollValue;
		else if (scrollValue < -maxScrollValue) scrollValue = -maxScrollValue;
		speed = scrollValue;
		clearTimeout(timer);
		timer = setTimeout(handleSpeedClear, 10);
	});

	function handleSpeedClear() {
		speed = 1;
	}
};

function controlVideo() {
	var video = document.getElementById("backVideo");
	var btn = document.getElementById("videoBtn");
	if (video.paused) {
		video.play();
		btn.innerHTML = "■";
	} else {
		video.pause();
		btn.innerHTML = "►";
	}
}

// Ref - https://www.sliderrevolution.com/resources/css-slideshow/
function rollingAds() {
	const items = document.querySelectorAll('.item'),
		controls = document.querySelectorAll('.control'),
		activeDelay = .76,
		interval = 5000;

	let current = 0;

	const slider = {
		init: () => {
			controls.forEach(control => control.addEventListener('click', (e) => {
				slider.clickedControl(e)
			}));
			controls[current].classList.add('active');
			items[current].classList.add('active');
		},
		nextSlide: () => { // Increment current slide and add active class
			slider.reset();
			if (current === items.length - 1) current = -1; // Check if current slide is last in array
			current++;
			controls[current].classList.add('active');
			items[current].classList.add('active');
		},
		clickedControl: (e) => { // Add active class to clicked control and corresponding slide
			slider.reset();
			clearInterval(intervalF);

			const control = e.target,
				dataIndex = Number(control.dataset.index);

			control.classList.add('active');
			items.forEach((item, index) => {
				if (index === dataIndex) { // Add active class to corresponding slide
					item.classList.add('active');
				}
			})
			current = dataIndex; // Update current slide
			intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
		},
		reset: () => { // Remove active classes
			items.forEach(item => item.classList.remove('active'));
			controls.forEach(control => control.classList.remove('active'));
		},
		transitionDelay: (
			items
		) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
			let seconds;

			items.forEach(item => {
				const children = item.childNodes; // .vertical-part(s)
				let count = 1,
					delay;

				item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

				children.forEach(child => { // iterate through .vertical-part(s) and style b element
					if (child.classList) {
						item.parentNode.classList.contains('active') ? delay = count *
							seconds + activeDelay : delay = count * seconds;
						child.firstElementChild.style.transitionDelay =
							`${delay}s`; // b element
						count++;
					}
				})
			})
		},
	}

	let intervalF = setInterval(slider.nextSlide, interval);
	slider.init();
}

function desktopNav() {
	function showDropdown(event) {
		var dropdown = this.querySelector('.dropdown');
		dropdown.style.display = 'block';
	}

	function hideDropdown(event) {
		var dropdown = this.querySelector('.dropdown');
		dropdown.style.display = 'none';
	}

	var tops = document.querySelectorAll('[id^=top]');
	var dropdowns = document.querySelectorAll('.dropdown');

	tops.forEach(function(top) {
		top.addEventListener('mouseenter', showDropdown);
		top.addEventListener('mouseleave', hideDropdown);
	});

	dropdowns.forEach(function(dropdown) {
		dropdown.addEventListener('mouseenter', showDropdown);
		dropdown.addEventListener('mouseleave', hideDropdown);
	});
}

function cellNav() {
	// Get elements for the nav and the trigger button
	var mobileNav = document.getElementById('cellnavwrapper');
	var cellNavIcon = document.getElementById('cellnavicon');
	var menuCollapse = document.getElementById('menucollapse');

	// Show the nav when the trigger button is clicked
	cellNavIcon.addEventListener('click', function() {
		mobileNav.classList.add('show');
	});

	// Hide the nav when the collapse button is clicked
	menuCollapse.addEventListener('click', function() {
		mobileNav.classList.remove('show');
	});
}

function initNav() {
    var desktopMediaQuery = window.matchMedia("(min-width: 951px)");
    var mobileMediaQuery = window.matchMedia("(max-width: 950px)");

    function handleDesktopChange(e) {
        if (e.matches) {
            desktopNav();
        }
    }

    function handleMobileChange(e) {
        if (e.matches) {
            cellNav();
        }
    }

    desktopMediaQuery.addListener(handleDesktopChange);
    mobileMediaQuery.addListener(handleMobileChange);

    // 初始化时根据当前屏幕大小调用相应的导航函数
    if (desktopMediaQuery.matches) {
        desktopNav();
    }
    if (mobileMediaQuery.matches) {
        cellNav();
    }
}