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

// Today as "YYYY-MM-DD" in the visitor's time zone, comparable as a string
// with the ISO dates the templates write into data attributes.
function todayIso() {
	var now = new Date();
	return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") +
		"-" + String(now.getDate()).padStart(2, "0");
}

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

	var todayStr = todayIso();
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

/* ============================================================================
   JOB LIST — filters for /ledige-stillinger/

   Liquid renders every position in _data/stillinger.yml, grouped by deadline
   year. The page sets a jobs-pending class that hides what had expired when
   the site was built, so the archive does not flash up before this runs.
   From here on "open" means a deadline of today or later by the visitor's own
   date, so a stale build still shows the right positions.

   The filters live in the controls themselves (pressed buttons, the year
   selects, the search box) and are mirrored in the query string
   (?vis=alle&fra=2010&til=2015&niva=phd,postdoc&q=...), which makes a
   filtered view linkable.
   ========================================================================== */

function initJobList() {
	var root = document.getElementById("jobs");
	if (!root) return;
	document.documentElement.classList.remove("jobs-pending");

	var form = document.getElementById("jobsFilters");
	var viewButtons = form.querySelectorAll("[data-view]");
	var chips = Array.from(form.querySelectorAll("[data-level]"));
	var from = document.getElementById("jobsFrom");
	var to = document.getElementById("jobsTo");
	var search = document.getElementById("jobsSearch");
	var reset = document.getElementById("jobsReset");
	var empty = document.getElementById("jobsEmpty");
	var emptyAction = document.getElementById("jobsEmptyAction");
	var groups = root.querySelectorAll(".jobs-year");
	// Year options run newest first. Years stay "YYYY" strings throughout,
	// which compare correctly as text.
	var firstYear = from.options[from.options.length - 1].value;
	var lastYear = from.options[0].value;
	var view = "open";

	var today = todayIso();
	var jobs = Array.from(root.querySelectorAll(".job"), function(row) {
		var deadline = row.getAttribute("data-deadline"); // "" when there is none
		var open = deadline >= today;
		row.querySelector(".job-deadline").classList.toggle("text-nmf-primary", open);
		return {
			row: row,
			open: open,
			year: deadline.slice(0, 4),
			level: row.getAttribute("data-level"),
			text: row.textContent.toLowerCase()
		};
	});

	function isPressed(btn) {
		return btn.getAttribute("aria-pressed") === "true";
	}

	// The brand fill comes from .nmf-primary in main.css, which also outranks
	// the grey of .w3-button:hover.
	function setPressed(btn, pressed) {
		btn.setAttribute("aria-pressed", String(pressed));
		btn.classList.toggle("nmf-primary", pressed);
	}

	// Reads the filters off the controls. The overrides give the "what if"
	// counts shown on the buttons.
	function filters(overrides) {
		return Object.assign({
			view: view,
			lo: from.value < to.value ? from.value : to.value,
			hi: from.value < to.value ? to.value : from.value,
			levels: chips.filter(isPressed).map(function(chip) { return chip.getAttribute("data-level"); }),
			words: search.value.toLowerCase().split(/\s+/).filter(Boolean)
		}, overrides);
	}

	function matches(job, f) {
		// Positions without a deadline only show when the range is the whole archive.
		var inRange = job.year ? f.lo <= job.year && job.year <= f.hi : f.lo === firstYear && f.hi === lastYear;
		return (f.view === "open" ? job.open : inRange) &&
			(!f.levels.length || f.levels.indexOf(job.level) !== -1) &&
			f.words.every(function(word) { return job.text.indexOf(word) !== -1; });
	}

	function countMatches(f) {
		return jobs.filter(function(job) { return matches(job, f); }).length;
	}

	function isDefault(f) {
		return f.view === "open" && f.lo === firstYear && f.hi === lastYear && !f.levels.length && !f.words.length;
	}

	function resetFilters() {
		view = "open";
		from.value = firstYear;
		to.value = lastYear;
		chips.forEach(function(chip) { setPressed(chip, false); });
		search.value = "";
	}

	function writeUrl(f) {
		var params = [];
		if (f.view === "all") {
			params.push("vis=alle");
			if (from.value !== firstYear) params.push("fra=" + from.value);
			if (to.value !== lastYear) params.push("til=" + to.value);
		}
		if (f.levels.length) params.push("niva=" + f.levels.join(","));
		if (f.words.length) params.push("q=" + encodeURIComponent(search.value.trim()));
		window.history.replaceState(null, "", params.length ? "?" + params.join("&") : window.location.pathname);
	}

	function render() {
		var f = filters();
		var shown = 0;
		jobs.forEach(function(job) {
			var visible = matches(job, f);
			job.row.classList.toggle("w3-hide", !visible);
			if (visible) shown++;
		});
		groups.forEach(function(group) {
			group.classList.toggle("w3-hide", !group.querySelector(".job:not(.w3-hide)"));
		});

		viewButtons.forEach(function(btn) {
			var btnView = btn.getAttribute("data-view");
			setPressed(btn, btnView === view);
			btn.querySelector("span").textContent = "(" + countMatches(filters({ view: btnView })) + ")";
		});
		chips.forEach(function(chip) {
			var level = chip.getAttribute("data-level");
			chip.querySelector("span").textContent = "(" + countMatches(filters({ levels: [level] })) + ")";
		});

		document.getElementById("jobsCount").textContent = view === "open"
			? (shown === 1 ? "1 åpen stilling" : shown + " åpne stillinger")
			: shown + " av " + jobs.length + " stillinger";
		// w3-hide rather than the hidden attribute: .w3-button sets its own display.
		reset.classList.toggle("w3-hide", isDefault(f));

		// With nothing filtered, an empty list means there are no open positions,
		// so offer the archive; otherwise offer to clear the filters.
		empty.hidden = shown > 0;
		document.getElementById("jobsEmptyText").textContent = isDefault(f)
			? "Ingen åpne stillinger er registrert akkurat nå."
			: "Ingen stillinger passer filtrene.";
		emptyAction.textContent = isDefault(f) ? "Se tidligere stillinger" : "Nullstill filtre";

		writeUrl(f);
	}

	// Restore a linked view. Unknown levels press no chip, and a year that is
	// not among the options leaves its select empty, so fall back to the ends.
	var params = new URLSearchParams(window.location.search);
	var levels = (params.get("niva") || "").split(",");
	if (params.get("vis") === "alle") view = "all";
	from.value = params.get("fra") || firstYear;
	to.value = params.get("til") || lastYear;
	if (!from.value) from.value = firstYear;
	if (!to.value) to.value = lastYear;
	chips.forEach(function(chip) { setPressed(chip, levels.indexOf(chip.getAttribute("data-level")) !== -1); });
	search.value = params.get("q") || "";

	form.addEventListener("click", function(event) {
		var btn = event.target.closest("button");
		if (!btn) return;
		if (btn.hasAttribute("data-view")) view = btn.getAttribute("data-view");
		else if (btn.hasAttribute("data-level")) setPressed(btn, !isPressed(btn));
		else if (btn === reset) resetFilters();
		render();
	});
	// A year range only means something for the archive, so picking one switches to it.
	[from, to].forEach(function(select) {
		select.addEventListener("change", function() {
			view = "all";
			render();
		});
	});
	search.addEventListener("input", render);
	emptyAction.addEventListener("click", function() {
		if (isDefault(filters())) view = "all";
		else resetFilters();
		render();
	});

	render();
	form.hidden = false;
}

window.addEventListener("DOMContentLoaded", initJobList);
