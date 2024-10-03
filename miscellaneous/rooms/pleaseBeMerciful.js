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
