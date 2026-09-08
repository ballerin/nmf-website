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

/* ============================================================================
   EVENT FILTER — show only future events based on user datetime
   ========================================================================== */

function initEventFilter() {
	var cards = document.querySelectorAll('.event-card');
	var noEventsMsg = document.getElementById('noEventsMessage');
	var grid = document.getElementById('eventGrid');

	if (!cards.length) return;

	// The template already rendered the first data-max-visible upcoming events
	// and hid the rest. Re-apply that cap here rather than just revealing
	// everything still upcoming, otherwise a stale build spills the whole
	// backlog onto the homepage. Cards sit in chronological order (index.html
	// sorts by start-date), so counting down the NodeList picks the next ones.
	var maxVisible = parseInt(grid && grid.getAttribute('data-max-visible'), 10);
	if (isNaN(maxVisible)) maxVisible = Infinity;

	var now = new Date();
	// Normalise to date-only string (YYYY-MM-DD) in local time
	var yyyy = now.getFullYear();
	var mm = String(now.getMonth() + 1).padStart(2, '0');
	var dd = String(now.getDate()).padStart(2, '0');
	var todayStr = yyyy + '-' + mm + '-' + dd;

	var visibleCount = 0;

	cards.forEach(function(card) {
		var endDate = card.getAttribute('data-end-date');
		if (endDate && endDate >= todayStr && visibleCount < maxVisible) {
			card.classList.remove('event-card--hidden');
			visibleCount++;
		} else {
			card.classList.add('event-card--hidden');
		}
	});

	if (noEventsMsg) {
		noEventsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
	}
}

window.addEventListener("DOMContentLoaded", initEventFilter);

/* ============================================================================
   CARD PAGINATION — splits a long .card-grid into pages of N cards

   A grid opts in with data-paginate="12" and is paired with
   {% include pagination.html for="<grid id>" %}. Every card stays in the HTML
   and only off-page ones are hidden, with W3.CSS's w3-hide, so search engines
   and a javascript-less browser still see the full list. Card images are
   loading="lazy", so hidden cards cost no image requests.

   The current page is mirrored in ?side=, which makes a page linkable and lets
   the back button step through pages.
   ========================================================================== */

function setupCardPagination(grid) {
	var perPage = parseInt(grid.getAttribute("data-paginate"), 10) || 12;
	var cards = Array.prototype.slice.call(grid.children);
	var nav = document.querySelector('[data-pagination-for="' + grid.id + '"]');
	var totalPages = Math.ceil(cards.length / perPage);

	// A single page needs no controls: every card stays visible, nav stays hidden.
	if (!nav || totalPages < 2) return;

	var steps = nav.querySelectorAll("[data-page-step]");
	var list = nav.querySelector(".pagination-pages");
	var numbers = [];
	var current;

	// The set of page buttons never changes, so build it once here; paging then
	// only restyles them.
	for (var page = 1; page <= totalPages; page++) {
		var btn = document.createElement("button");
		btn.type = "button";
		btn.className = "w3-button w3-border w3-round";
		btn.textContent = page;
		btn.setAttribute("aria-label", "Side " + page);
		btn.addEventListener("click", goToPage.bind(null, page, true));
		numbers.push(list.appendChild(btn));
	}

	function pageFromUrl() {
		return parseInt(new URLSearchParams(window.location.search).get("side"), 10) || 1;
	}

	function goToPage(page, fromClick) {
		current = Math.min(Math.max(page, 1), totalPages);

		cards.forEach(function(card, i) {
			card.classList.toggle("w3-hide", Math.floor(i / perPage) + 1 !== current);
		});

		numbers.forEach(function(btn, i) {
			var isCurrent = i + 1 === current;
			btn.classList.toggle("is-current", isCurrent);
			if (isCurrent) btn.setAttribute("aria-current", "page");
			else btn.removeAttribute("aria-current");
		});

		steps.forEach(function(step) {
			var target = current + parseInt(step.getAttribute("data-page-step"), 10);
			step.disabled = target < 1 || target > totalPages;
		});

		if (fromClick) {
			// Without this, clicking a control at the foot of the grid leaves the
			// reader looking at the bottom of a page they have not seen.
			grid.scrollIntoView({ behavior: "smooth", block: "start" });
			window.history.pushState(null, "",
				current === 1 ? window.location.pathname : "?side=" + current);
		}
	}

	steps.forEach(function(step) {
		step.addEventListener("click", function() {
			goToPage(current + parseInt(step.getAttribute("data-page-step"), 10), true);
		});
	});

	window.addEventListener("popstate", function() { goToPage(pageFromUrl(), false); });

	goToPage(pageFromUrl(), false);
	nav.hidden = false;
}

function initCardPagination() {
	document.querySelectorAll("[data-paginate]").forEach(setupCardPagination);
}

window.addEventListener("DOMContentLoaded", initCardPagination);
