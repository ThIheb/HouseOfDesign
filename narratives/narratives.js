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

/*documentation*/
const scrollee = document.querySelector(".scrollee");

function getScrollAmount() {
    // Calculate the width of the `.races` element and subtract the window width
    let scrolleeWidth = scrollee.scrollWidth;
    return -(scrolleeWidth - window.innerWidth);
}

const tween = gsap.to(scrollee, {
    x: getScrollAmount, // Move horizontally by the calculated amount
    duration: 3, // This will not affect the actual scroll speed with scrub set to true
    ease: "none", // No easing for a smooth scroll effect
});

ScrollTrigger.create({
    trigger: ".scroller", // The element that triggers the scroll animation
    start: "top top", // Start the scroll animation when the top of `.racesWrapper` hits the top of the viewport
    end: () => `+=${scrollee.scrollWidth - window.innerWidth}`, // The scroll distance is the difference in widths
    pin: true, // Pin the `.racesWrapper` while the animation is active
    animation: tween, // Link the animation
    scrub: 1, // Scrub allows syncing the animation with the scrollbar position
    invalidateOnRefresh: true, // Recalculate on browser resize
    markers: true // For debugging (you can remove this later)
});




/*usage narrative*/
$('.carousel').carousel({
    interval: 2000
  })