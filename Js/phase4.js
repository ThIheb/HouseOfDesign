/*logo animation*/

gsap.set(".textlogohome", {
    color: "#FFFFFF", 
    top: "50%",        
});

ScrollTrigger.create({
	animation: gsap.to(".textlogohome", {
		top: "70px",
		scale: 0.18,
		ease: "power1.out",
		color: "#F50045",
	}),
	scrub: true,
	trigger: ".content",
	start: "top 90%",
	end: "top 55%",
	pin: true,
});



//counter animation
const config = {
	amount: 19,
	increment: 1,
	counterSpeed: 60
};

let counter = document.querySelector(".maintitle-1");
let i = 0;
let interval;

const startCounter = () => {
	interval = setInterval(() => {
		if (i < config.amount) {
			i += config.increment;
			counter.innerText = i;
		} else {
			counter.innerText = config.amount;
			clearInterval(interval); 
		}
	}, config.counterSpeed);
};


const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			startCounter();
			observer.unobserve(entry.target); 
		}
	});
}, { threshold: 1 }); 

observer.observe(counter);


