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
        start: "top center",
        end: () => `+=${scrollee.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, 
        markers: false,
    });

  

    // Refresh on window resize
    const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    // Refresh scroll amount on orientation change
    window.addEventListener("orientationchange", () => {
        ScrollTrigger.refresh();
    });
};
