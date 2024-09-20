document.addEventListener('DOMContentLoaded', function () {
  let currentItem = 0; // Start at the first item
  const items = document.querySelectorAll('.carousel .designers .item');
  const designers = document.querySelector('.carousel .designers');
  const totalItems = items.length;

  // Set initial item visibility
  updateCarousel();

  document.getElementById('prev').addEventListener('click', function () {
      moveSlide(-1);
  });

  document.getElementById('next').addEventListener('click', function () {
      moveSlide(1);
  });

  function moveSlide(direction) {
      currentItem = (currentItem + direction + totalItems) % totalItems; // Move to the next/prev item
      updateCarousel();
  }

  function updateCarousel() {
      const percentage = -(currentItem * 100); // Move the designers container based on the current item
      designers.style.transform = `translateX(${percentage}%)`;
      
      // Update z-index and opacity for each item
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
