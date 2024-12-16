window.onload = function () {
    const scrollee = document.querySelector(".scrollee");

    function getScrollAmount() {
        let scrolleeWidth = scrollee.scrollWidth;
        let viewportWidth = window.innerWidth;
        return -(scrolleeWidth - viewportWidth); 
    }

    const tween = gsap.to(scrollee, {
        x: getScrollAmount, 
        duration: 3,
        ease: "none",
    });

    ScrollTrigger.create({
        trigger: ".scroller",
        start: "top top",
        end: () => `+=${scrollee.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, 
        markers: false,
    });


    const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("orientationchange", () => {
        ScrollTrigger.refresh();
    });
};
