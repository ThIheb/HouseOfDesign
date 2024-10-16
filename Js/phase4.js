/*var items = []
var narratives = []
var currentSelection = []
var currentNarrative = ""
var currentValue = ""
var currentSort = ""


document.addEventListener("DOMContentLoaded", async function (event) {
	console.log("Ready to start with phase 4")
	fetch('Js/infoPhase4.json')
		.then(response => response.json())
		.then(data => {
			items = data.items
			var startWith = data.meta.startWith
			var item = items[startWith]

			narratives = data.meta.narratives
			currentNarrative = data.meta.startNarrative
			currentValue = data.meta.startValue
			prepareNarratives()
		})
});

function prepareNarratives() {
	currentSelection = items.filter(i =>
		i.info[currentNarrative]?.includes(currentValue)
	)
	currentSelection.sort((i, j) =>
		i['@sort'] < j['@sort'] ? -1 : 1
	)
	if (currentSelection.length == 0)
		currentSelection = items

	var index = currentSelection.findIndex(i => i['@sort'] == currentSort)
	if (index == -1) index = 0
	showInfo(index)
}

function showInfo(index) {
	var item = currentSelection[index]
	currentSort = item['@sort']
	inner("header", item.shortName);
	inner("type-info", item.info.Type);
	inner("fullHeader", item.shortName);
	byId("img").src = item.image
	byId("img").alt = item.shortName
	createInfoTable(item)
	inner("shortInfo", item.shortInfo + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="more()">Tell me more...</a>');
	inner("longerInfo", "<p>" + item.longerInfo.join("</p><p>") + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="less()">Tell me less</a> or <a type="button" class="btn btn-outline-primary btn-sm" onclick="muchMore()">Tell me even more...</a></p>');
	byId("fullInfo").dataset['uri'] = item.fullInfo

	prepareNavigationButtons(index)
}

function more() {
	hide("shortInfo");
	show("longerInfo");
	hide("fullInfo");
}
function less() {
	hide("longerInfo");
	show("shortInfo");
	hide("fullInfo");
}
function muchMore() {
	var uri = byId("fullInfo").dataset['uri']
	fetch(uri)
		.then(response => response.text())
		.then(data => {
			inner("fullInfoContent", data);
			hide("mainCard");
			show("fullInfo");
			window.scrollTo(0, 0)
		})
}
function hideFullInfo() {
	hide("longerInfo");
	show("shortInfo");
	hide("fullInfo");
	show("mainCard");
}

function createInfoTable(item) {
	// Clear both sections before adding content
	inner("infoTable1", "", true);
	inner("infoTable2", "", true);

	// Define the keys that should go into each section
	const firstSectionKeys = ["Designer", "Usage", "Space", "History"]; // Keys for the first section
	const secondSectionKeys = ["Date of Project", "Dimensions", "Company", "Material", "Type"]; // Keys for the second section

	// Populate first section based on firstSectionKeys
	for (var key of firstSectionKeys) {
		if (item.info[key] !== null && item.info[key] !== undefined) {
			if (narratives.includes(key)) {
				var items = item.info[key].split(", ");
				var val = [];
				for (var j in items) {
					val.push('<a class="button" role="button" href="#" onclick="changeNarrative(\'' + key + '\',\'' + items[j] + '\')">' + items[j] + '</a>');
				}
				inner("infoTable1", "<tr><th>" + key + "</th><td>" + val.join(", ") + "</td></tr>", false);
			} else {
				inner("infoTable1", "<tr><th>" + key + "</th><td>" + item.info[key] + "</td></tr>", false);
			}
		}
	}

	// Populate second section based on secondSectionKeys
	for (var key of secondSectionKeys) {
		if (item.info[key] !== null && item.info[key] !== undefined) {
			if (narratives.includes(key)) {
				var items = item.info[key].split(", ");
				var val = [];
				for (var j in items) {
					val.push('<a class="button" role="button" href="#" onclick="changeNarrative(\'' + key + '\',\'' + items[j] + '\')">' + items[j] + '</a>');
				}
				inner("infoTable2", "<tr><th>" + key + "</th><td>" + val.join(", ") + "</td></tr>", false);
			} else {
				inner("infoTable2", "<tr><th>" + key + "</th><td>" + item.info[key] + "</td></tr>", false);
			}
		}
	}
}

function prepareNavigationButtons(index) {
	if (index > 0) {
		byId("buttonPrevious").disabled = false
		byId("buttonPrevious").onclick = () => showInfo(index - 1)
		byId("buttonPrevious").innerHTML = currentSelection[index - 1].shortName
	} else {
		byId("buttonPrevious").disabled = true
		byId("buttonPrevious").onclick = null
		byId("buttonPrevious").innerHTML = "--"
	}
	if (index < currentSelection.length - 1) {
		byId("buttonNext").disabled = false
		byId("buttonNext").onclick = () => showInfo(index + 1)
		byId("buttonNext").innerHTML = currentSelection[index + 1].shortName
	} else {
		byId("buttonNext").disabled = true
		byId("buttonNext").onclick = null
		byId("buttonNext").innerHTML = "--"
	}
	inner('narrative', currentNarrative + ": " + currentValue)
}

function changeNarrative(narrative, value) {
	currentNarrative = narrative
	currentValue = value
	prepareNarratives()
}

function byId(id) {
	return document.getElementById(id)
}

function show(id) {
	document.getElementById(id).classList.remove('d-none')
}

function hide(id) {
	document.getElementById(id).classList.add('d-none')
}

function inner(id, content, emptyFirst = true) {
	if (emptyFirst) document.getElementById(id).innerHTML = "";
	document.getElementById(id).innerHTML += content;
}*/

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



/*logo animation*/
ScrollTrigger.create({
	animation: gsap.to(".textlogo", {
		top: "50px",
		scale: 0.25,
		ease: "power1.out",
		color: "#F50045",
	}),
	scrub: true,
	trigger: ".content",
	start: "top bottom",
	end: "top center",
	pin: true,
});

/*bootstrap carousel*/
$('.carousel').carousel({
	interval: 5
}
);


