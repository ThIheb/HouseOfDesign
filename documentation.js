
//horizontal scrolling
window.onload = function () {
    const scrollee = document.querySelector(".scrollee");

    function getScrollAmount() {
        let scrolleeWidth = scrollee.scrollWidth;
        return -(scrolleeWidth - window.innerWidth);
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
};

const resizeObserver = new ResizeObserver(() => {
    ScrollTrigger.refresh();
});

resizeObserver.observe(document.body);

