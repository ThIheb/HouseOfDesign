document.addEventListener('DOMContentLoaded', function () {
  let currentItem = 0; 
  const items = document.querySelectorAll('.carousel .designers .item');
  const designers = document.querySelector('.carousel .designers');
  const totalItems = items.length;

  updateCarousel();

  document.getElementById('prev').addEventListener('click', function () {
      moveSlide(-1);
  });

  document.getElementById('next').addEventListener('click', function () {
      moveSlide(1);
  });

  function moveSlide(direction) {
      currentItem = (currentItem + direction + totalItems) % totalItems; 
      updateCarousel();
  }

  function updateCarousel() {
      const percentage = -(currentItem * 100); 
      designers.style.transform = `translateX(${percentage}%)`;
      
    
      items.forEach((item, index) => {
          const intro = item.querySelector('.intro');
          if (index === currentItem) {
              item.style.zIndex = 10;
              intro.style.opacity = '1';
              intro.style.pointerEvents = 'auto';
          } else {
              item.style.zIndex = 5;
              intro.style.opacity = '0';
              intro.style.pointerEvents = 'none';
          }
      });
  }
});

/*spaces*/
let target = 0;  // Target scroll position
let current = 0;  // Current scroll position
let ease = 0.1;  // Easing factor (adjust to control smoothness)
const scrollSensitivity = 2;  // Sensitivity for the scroll behavior

// DOM elements for slider and marker
const sliderWrapper = document.querySelector(".slider-wrapper");
const markerWrapper = document.querySelector(".marker-wrapper");
const activeSlide = document.querySelector(".active-slide");

let maxScroll = sliderWrapper.scrollWidth - window.innerWidth;  // Max scrollable distance

// Linear interpolation function for smooth transitions
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Update active slider number based on scroll position
function updateActiveSliderNumber(markerMove, markerMaxMove) {
    const partWidth = markerMaxMove / 10;  // Assuming 10 parts/slides
    let currentPart = Math.round((markerMove - 70) / partWidth) + 1;
    currentPart = Math.min(10, Math.max(currentPart, 1));  // Clamp between 1 and 10
    activeSlide.textContent = `${currentPart}/10`;
}

// Main update loop for smooth animations
function update() {
    current = lerp(current, target, ease);  // Smoothly transition to the target scroll position

    // Apply the translation to the slider
    sliderWrapper.style.transform = `translateX(${-current}px)`;

    // Marker position logic (scroll indicator)
    let moveRatio = current / maxScroll;
    let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
    let markerMove = 70 + moveRatio * markerMaxMove;

    // Move the marker smoothly
    markerWrapper.style.transform = `translateX(${markerMove}px)`;

    // Update the active slider number display
    updateActiveSliderNumber(markerMove, markerMaxMove);

    // Continuously call update for smooth animation
    requestAnimationFrame(update);
}

// Recalculate maxScroll on window resize to adapt to changes
window.addEventListener("resize", () => {
    maxScroll = sliderWrapper.scrollWidth - window.innerWidth;
});

// Handle mouse wheel events for scrolling
window.addEventListener("wheel", (e) => {
    target += e.deltaY * scrollSensitivity;  // Scroll increment

    // Clamp the target to avoid scrolling out of bounds
    target = Math.max(0, Math.min(maxScroll, target));
});

// Initialize the animation loop
update();


/*usage narrative*/
$('.carousel').carousel({
    interval: 2000
  })