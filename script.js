document.addEventListener('DOMContentLoaded', function () {
  let multipleCardCarousel = document.querySelector("#carouselExampleControls");


  if (window.matchMedia("(min-width: 768px)").matches) {
    let carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false, // Disable automatic sliding
      wrap: false, // Prevent wrapping at the end
    });

    let carouselWidth = document.querySelector(".carousel-inner").scrollWidth;
    let cardWidth = document.querySelector(".carousel-item").offsetWidth;
    let scrollPosition = 0;

    document.querySelector("#carouselExampleControls .carousel-control-next").addEventListener("click", function () {
      if (scrollPosition - (carouselWidth - cardWidth * 5) < 0) {
        scrollPosition += cardWidth * 1;
        document.querySelector("#carouselExampleControls .carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
      }
    });

    document.querySelector("#carouselExampleControls .carousel-control-prev").addEventListener("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth * 1;
        document.querySelector("#carouselExampleControls .carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
      }
    });
  } else {
    multipleCardCarousel.classList.add("slide");
  }
});