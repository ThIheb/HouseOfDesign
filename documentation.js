
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
        start: "top top",
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

//doc
// Function to show or hide content
document.addEventListener('DOMContentLoaded', function () {
    function showOrHide(room) {
        document.querySelectorAll('.content').forEach((content) => {
            content.classList.remove('visible');
            content.classList.add('hidden');
        });

        const selectedRoom = document.getElementById(`${room}_text`);
        if (selectedRoom) {
            selectedRoom.classList.remove('hidden');
            selectedRoom.classList.add('visible');
        }
    }

    function hideIntroductionAndShowContent(room) {
        const introSection = document.getElementById('introduction');
        if (introSection) {
            introSection.style.display = 'none';
        }

        const nav = document.querySelector('.nav-pills');
        if (nav) {
            nav.style.display = 'block';
        }
        showOrHide(room);
    }

    document.getElementById('show-overview').addEventListener('click', () => hideIntroductionAndShowContent('overview'));
    document.getElementById('show-structure').addEventListener('click', () => hideIntroductionAndShowContent('structure'));
    document.getElementById('show-functionality').addEventListener('click', () => hideIntroductionAndShowContent('functionality'));
    document.getElementById('show-design').addEventListener('click', () => hideIntroductionAndShowContent('design'));
    document.getElementById('show-workflow').addEventListener('click', () => hideIntroductionAndShowContent('workflow'));
    document.getElementById('show-credits').addEventListener('click', () => hideIntroductionAndShowContent('credits'));



    document.getElementById('overview-tab').addEventListener('click', () => showOrHide('overview'));
    document.getElementById('structure-tab').addEventListener('click', () => showOrHide('structure'));
    document.getElementById('functionality-tab').addEventListener('click', () => showOrHide('functionality'));
    document.getElementById('design-tab').addEventListener('click', () => showOrHide('design'));
    document.getElementById('workflow-tab').addEventListener('click', () => showOrHide('workflow'));
    document.getElementById('credits-tab').addEventListener('click', () => showOrHide('credits'));

});
