// Modal Image Gallery
function onClick(element) {
  var img = document.getElementById("img01");
  if (img) { img.src = element.src; }
  var modal = document.getElementById("modal01");
  if (modal) { modal.style.display = "block"; }
  var captionText = document.getElementById("caption");
  if (captionText) { captionText.innerHTML = element.alt; }
}

function toggleMobileNav() {
  var menu = document.getElementById("mobileNav");
  if (!menu) {
    return;
  }

  if (menu.className.indexOf("w3-show") === -1) {
    menu.className += " w3-show";
  } else {
    menu.className = menu.className.replace(" w3-show", "");
  }
}

function initDropdownBehavior() {
  var dropdowns = document.querySelectorAll(".site-navbar details.nav-dropdown");
  if (!dropdowns.length) {
    return;
  }

  dropdowns.forEach(function(dropdown) {
    var summary = dropdown.querySelector("summary");
    if (!summary) {
      return;
    }

    summary.addEventListener("click", function(event) {
      var isOpen = dropdown.hasAttribute("open");

      dropdowns.forEach(function(other) {
        if (other !== dropdown) {
          other.removeAttribute("open");
        }
      });

      if (!isOpen) {
        dropdown.setAttribute("open", "");
      } else {
        dropdown.removeAttribute("open");
      }

      event.preventDefault();
    });
  });
}

window.addEventListener("DOMContentLoaded", initDropdownBehavior);

function initMobileDropdowns() {
	var dropdowns = document.querySelectorAll("#mobileNav details.mobile-nav-dropdown");
	if (!dropdowns.length) return;

	dropdowns.forEach(function(dropdown) {
		var summary = dropdown.querySelector("summary");
		if (!summary) return;

		summary.addEventListener("click", function(event) {
			var isOpen = dropdown.hasAttribute("open");

			dropdowns.forEach(function(other) {
				if (other !== dropdown) other.removeAttribute("open");
			});

			if (!isOpen) {
				dropdown.setAttribute("open", "");
			} else {
				dropdown.removeAttribute("open");
			}

			event.preventDefault();
		});
	});
}

window.addEventListener("DOMContentLoaded", initMobileDropdowns);

/* ============================================================================
   CAROUSEL
   ========================================================================== */

function initCarousel() {
	var track = document.getElementById("carouselTrack");
	var dots = document.querySelectorAll("#carouselDots .carousel-dot");
	var prevBtn = document.getElementById("carouselPrev");
	var nextBtn = document.getElementById("carouselNext");

	if (!track || !dots.length) return;

	var currentIndex = 0;
	var totalSlides = dots.length;

	function goToSlide(index) {
		if (index < 0) index = totalSlides - 1;
		if (index >= totalSlides) index = 0;
		currentIndex = index;
		track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";

		dots.forEach(function(dot, i) {
			dot.classList.toggle("active", i === currentIndex);
		});
	}

	function nextSlide() { goToSlide(currentIndex + 1); }
	function prevSlide() { goToSlide(currentIndex - 1); }

	if (prevBtn) prevBtn.addEventListener("click", prevSlide);
	if (nextBtn) nextBtn.addEventListener("click", nextSlide);

	dots.forEach(function(dot) {
		dot.addEventListener("click", function() {
			var idx = parseInt(this.getAttribute("data-index"), 10);
			goToSlide(idx);
		});
	});

	// Auto-play support – reads data attribute set by Liquid
	var wrapper = track.closest(".carousel-wrapper");
	var interval = wrapper ? parseInt(wrapper.dataset.interval, 10) : 0;
	var autoPlay = wrapper ? wrapper.dataset.autoPlay : "false";

	if (autoPlay === "true" && interval > 0) {
		setInterval(nextSlide, interval * 1000);
	}
}

window.addEventListener("DOMContentLoaded", initCarousel);
