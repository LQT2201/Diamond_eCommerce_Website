var navbar = null;
window.onscroll = function() {
  if(navbar === null)
    navbar = document.getElementById("navbar");
  else
    stickyNavbar();
}

function stickyNavbar() {
  if (window.scrollY > navbar.offsetTop) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}