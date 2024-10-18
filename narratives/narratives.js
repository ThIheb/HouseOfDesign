document.addEventListener('DOMContentLoaded', function () {
  let currentItem = 0; // Start at the first item
  const items = document.querySelectorAll('.carousel .designers .item');
  const designers = document.querySelector('.carousel .designers');
  const totalItems = items.length;

  // History Timeline
  const line = document.querySelector(".timeline-innerline");
  
  let i = 0;
  let i2 = 1;
  let target1 = document.querySelector(".timeline ul");
  let target2 = document.querySelectorAll(".timeline ul li");

  const timeline_events = document.querySelectorAll("ul li");

  // Controllo che gli elementi siano selezionati correttamente
  console.log("target1:", target1);
  console.log("target2:", target2);

  if (!target1 || target2.length === 0) {
      console.error("Gli elementi della timeline non sono stati trovati correttamente.");
      return;  // Esci se non trovi gli elementi
  }

  function showTime(e) {
      e.setAttribute("done", "true");
      e.querySelector(".timeline-point").style.background = "#F50045";
      e.querySelector(".date").style.opacity = "100%";
      e.querySelector("p").style.opacity = "100%";
      e.querySelector("p").style.transform = "translateY(0px)";
  }

  function hideTime(e) {
      e.removeAttribute("done");
      e.querySelector(".timeline-point").style.background = "rgb(228, 228, 228)";
      e.querySelector(".date").style.opacity = "0%";
      e.querySelector("p").style.opacity = "0%";
      e.querySelector("p").style.transform = "translateY(-10px)";
  }

  function slowLoop() {
    setTimeout(function () {
        if (timeline_events[i]) {  // Controllo che esiste un elemento
            showTime(timeline_events[i]);
            timelineProgress(i + 1);
            i++;
            if (i < timeline_events.length) {
                slowLoop();
            }
        }
    }, 800);
}

  function timelineProgress(value) {
      let progress = `${(value / timeline_events.length) * 100}%`;
      if (window.matchMedia("(min-width: 728px)").matches) {
          line.style.width = progress;
          line.style.height = "4px";
      } else {
          line.style.height = progress;
          line.style.width = "4px";
      }
  }

  let observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.intersectionRatio > 0.9) {
                  if (window.matchMedia("(min-width: 728px)").matches) {
                      slowLoop();
                  } else {
                      showTime(entry.target);
                      timelineProgress(i2);
                      i2++;
                  }
                  observer.unobserve(entry.target);
              }
          });
      },
      { threshold: 1, rootMargin: "0px 0px -50px 0px" }
  );

  if (window.matchMedia("(min-width: 728px)").matches) {
      observer.observe(target1);
  } else {
      target2.forEach((t) => {
          observer.observe(t);
      });
  }

  timeline_events.forEach((li, index) => {
      li.addEventListener("click", () => {
          if (li.getAttribute("done")) {
              timelineProgress(index);

              // Nascondi tutti gli eventi della timeline dopo quello cliccato
              timeline_events.forEach((ev, idx) => {
                  if (idx >= index +1 ) {
                      hideTime(ev);
                  }
              });
          } else {
              timelineProgress(index + 1);

              // Mostra tutti gli eventi della timeline fino a quello cliccato
              timeline_events.forEach((ev, idx) => {
                  if (idx <= index) {
                      showTime(ev);
                  }
              });
          }
      });
  });

  var doit;
  window.addEventListener("resize", () => {
      clearTimeout(doit);
      doit = setTimeout(resizeEnd, 1200);
  });

  function resizeEnd() {
      i = 0;
      slowLoop();
  }


    // Funzionalità di "Tell me more"
    document.querySelectorAll('.tell-more').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenire il comportamento predefinito del link
            
            const targetId = this.getAttribute('data-target'); // Identifica il contenuto corrispondente
            
            // Nascondi solo le sezioni info-section, senza nascondere i paragrafi sopra la linea del tempo
            document.querySelectorAll('.info-section').forEach(section => {
                section.style.display = 'none'; // Nasconde tutte le sezioni info-section
            });

            // Mostra la sezione corrispondente (es. info-1950, info-1960, etc.)
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block'; // Mostra solo la sezione corrispondente
            }

            // Scorri la pagina verso la sezione aggiuntiva per migliorare l'esperienza utente
            targetSection.scrollIntoView({ behavior: 'smooth' });

            
        });
    });








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
