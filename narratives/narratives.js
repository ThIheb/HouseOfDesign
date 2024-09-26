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
