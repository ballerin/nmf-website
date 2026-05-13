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
