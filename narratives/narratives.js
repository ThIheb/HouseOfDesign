document.addEventListener('DOMContentLoaded', function () {
    // History Timeline

    const line = document.querySelector(".timeline-innerline");

    let i = 0;
    let i2 = 1;
    let target1 = document.querySelector(".timeline ul");
    let target2 = document.querySelectorAll(".timeline ul li");

    const timeline_events = document.querySelectorAll("ul li");


    console.log("target1:", target1);
    console.log("target2:", target2);

    if (!target1 || target2.length === 0) {
        console.error("Gli elementi della timeline non sono stati trovati correttamente.");
        return;
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
            if (timeline_events[i]) {
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


                timeline_events.forEach((ev, idx) => {
                    if (idx >= index + 1) {
                        hideTime(ev);
                    }
                });
            } else {
                timelineProgress(index + 1);


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



    document.querySelectorAll('.tell-more').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-target');


            document.querySelectorAll('.info-section').forEach(section => {
                section.style.display = 'none';
            });


            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }


            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });



        });


        document.querySelectorAll('.tell-less').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('data-target');


                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'none';
                }


                const contentSectionId = targetId.replace('info', 'content');
                const contentSection = document.getElementById(contentSectionId);
                if (contentSection) {
                    contentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    })

/*carousel designer narrative*/
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




const hiddenElements = document.querySelectorAll(".content_that_appears");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));





$('.carousel').carousel({
    interval: 2000
}
);

function initializeCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const images = carousel.getElementsByTagName("img");
    const totalImages = images.length;
    let index = 0;


    for (let i = 0; i < totalImages; i++) {
        images[i].style.position = "absolute";
        images[i].style.transition = "transform 0.5s ease";
        if (i !== index) {
            images[i].style.transform = "translateX(100%)";
        }
    }

    setInterval(() => {
        images[index].style.transform = "translateX(-100%)";
        index = (index + 1) % totalImages;
        images[index].style.transform = "translateX(0)";


        setTimeout(() => {
            for (let i = 0; i < totalImages; i++) {
                if (i !== index) {
                    images[i].style.transform = "translateX(100%)";
                }
            }
        }, 500);
    }, 3000);
}


initializeCarousel("carouselImages1");
initializeCarousel("carouselImages2");
initializeCarousel("carouselImages3");




