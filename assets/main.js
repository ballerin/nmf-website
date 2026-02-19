// Site-wide UI scripts moved from default layout
// Script to open and close sidebar
function w3_open() {
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

function w3_toggle() {
  if (document.getElementById("sidebar").style.display === 'block') {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("myOverlay").style.marginLeft = "40px";
  } else {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("myOverlay").style.marginLeft = "340px";
  }
}

// Modal Image Gallery
function onClick(element) {
  var img = document.getElementById("img01");
  if (img) { img.src = element.src; }
  var modal = document.getElementById("modal01");
  if (modal) { modal.style.display = "block"; }
  var captionText = document.getElementById("caption");
  if (captionText) { captionText.innerHTML = element.alt; }
}
