var items = []
var narratives = []
var currentSelection = []
var currentNarrative = ""
var currentValue = ""
var currentSort = ""


document.addEventListener("DOMContentLoaded", async function (event) {
	console.log("Ready to start with phase 4");

	// Fetch data and initialize items and narratives
	fetch("Js/infoPhase4.json")
		.then(response => response.json())
		.then(data => {
			items = data.items;
			narratives = data.meta.narratives;

			// Check for narrative and item parameters in URL and display accordingly
			displayNarrativeFromURL();

			// Fallback setup if no URL parameters are present
			const params = new URLSearchParams(window.location.search);
			if (!params.has("narrative") && !params.has("item")) {
				// Default setup if no narrative or item in URL
				currentNarrative = data.meta.startNarrative;
				currentValue = data.meta.startValue;
				currentSort = "";
				prepareNarratives();
			}
		})
		.catch(error => console.error("Error fetching JSON:", error));
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
	var item = currentSelection[index];
	currentSort = item['@sort'];

	inner("header", item.shortName);
	inner("type-info", item.info.Type);
	inner("fullHeader", item.shortName);
	byId("wireframeImg").src = item.image;
	byId("wireframeImg").alt = item.shortName;
	byId("bottomImg").src = item.secondImage;
	byId("bottomImg").alt = item.shortName;
	createInfoTable(item);
	inner("briefDesc", "<p>" + item.intro + "</p>", true);
	inner("shortInfo", item.shortInfo + '</div><div class="row justify-content-end mt-2"><div class="col-2"><a type="button" class="btn btn-outline-dark btn-sm rounded-0 mx-2 ourButtons" onclick="more()">More</a></div>');
	inner("longerInfo", "<p>" + item.longerInfo.join("</p><p>") + '</div><div class="row justify-content-end mt-2"><div class="col-4"><a type="button" class="btn btn-outline-dark btn-sm rounded-0  mx-2 ourButtons" onclick="less()">Less</a><a type="button" class="btn btn-outline-dark btn-sm rounded-0 mx-2 ourButtons" onclick="muchMore()">More</a></p></div>');
	hide("longerInfo");
	hide("fullInfo");
	inner("fullInfo", "<p>" + item.fullInfo.join("</p><p>") + '</div><div class="row justify-content-end mt-2"><div class="col-2"><a type="button" class="btn btn-outline-dark btn-sm rounded-0 mx-2 ourButtons" onclick="hideFullInfo()">Less</a></div>');

	prepareNavigationButtons(index);
	prepareKeyWords(item);

	// Call `updateURL` with the item object to set the URL parameters
	updateURL(item);
}
function displayNarrativeFromURL() {
	// Parse the current URL for narrative and item parameters
	const params = new URLSearchParams(window.location.search);
	const narrativeParam = params.get("narrative");
	const itemParam = params.get("item");

	if (narrativeParam && itemParam) {
		// Set the current narrative and value to the URL parameters
		currentNarrative = decodeURIComponent(narrativeParam);
		const decodedItemName = decodeURIComponent(itemParam);

		// Find the matching item based on the `shortName` from the URL
		const startItem = items.find(i => i.shortName === decodedItemName);

		if (startItem) {
			// Set the current value and sort order
			currentValue = startItem.info[currentNarrative];
			currentSort = startItem['@sort'];

			// Prepare the narratives based on the selected values
			prepareNarratives();

			// Display the item information
			const index = currentSelection.findIndex(i => i.shortName === decodedItemName);
			if (index !== -1) {
				showInfo(index);
			} else {
				console.error("Item not found in the current selection.");
			}
		} else {
			console.error("Item specified in the URL not found in the items list.");
		}
	} else {
		console.warn("URL does not contain narrative or item parameters.");
	}
}

// Call this function during the DOMContentLoaded event or after data is loaded
document.addEventListener("DOMContentLoaded", async function () {
	await loadData();  // Assume `loadData` is a function that loads items and narratives data
	displayNarrativeFromURL();  // Display based on URL after data is loaded
});


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
	hide("longerInfo");
	hide("shortInfo");
	show("fullInfo")
}
function hideFullInfo() {
	hide("longerInfo");
	show("shortInfo");
	hide("fullInfo");
}

function createInfoTable(item) {

	// Define the keys that should go into each section
	const firstSectionKeys = ["Designer", "Usage", "Space", "History"]; // Keys for the first section
	const secondSectionKeys = ["Date of Project", "History", "Dimensions", "Company", "Material", "Type"]; // Keys for the second section

	// Populate first section based on firstSectionKeys
	for (var key of firstSectionKeys) {
		if (item.info[key] !== null && item.info[key] !== undefined) {

			var value = item.info[key];
			var id = key + "Row"
			inner(key, item.info[key], true);
			//var row = document.getElementById(key).innerHTML;
			//console.log(key, id, variable);
			//button = '<a class="button" role="button" id="'+key+'Button'+'" href="#" onclick="changeNarrative1(\'' + key + '\',\'' + value + '\')">' + variable + '</a>';

			//console.log(button)
			//inner(key, button, true);
		}
	}
	$(document).ready(function () {
		$(".narrativeButton").on('click', function () {
			var narrative = $(this).find("td").attr("id");
			var value = $(this).find("td").text();
			changeNarrative1(narrative, value);
			console.log(narrative, value)
		});
	});

	// Populate second section based on secondSectionKeys
	for (var Secondkey of secondSectionKeys) {
		if (item.info[Secondkey] !== null && item.info[key] !== undefined) {
			var value = item.info[Secondkey];
			inner(Secondkey, value, true)

		} else {
			Secondid = Secondkey
			inner(Secondid, "<p> error? </p>", true);
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
		byId("buttonPrevious").innerHTML = "None"
	}
	if (index < currentSelection.length - 1) {
		byId("buttonNext").disabled = false
		byId("buttonNext").onclick = () => showInfo(index + 1)
		byId("buttonNext").innerHTML = currentSelection[index + 1].shortName
	} else {
		byId("buttonNext").disabled = true
		byId("buttonNext").onclick = null
		byId("buttonNext").innerHTML = "None"
	}
	inner('narrative', currentNarrative + ": " + currentValue)
}

function prepareKeyWords(item) {
	var keywords = item.keywords.split(",")
	console.log(keywords)
	var kwDiv = '<p class="d-inline">' + keywords[0] + '</p><i class="bi bi-dot"></i><p class="d-inline">' + keywords[1] + '</p><i class="bi bi-dot"></i><p class="d-inline">' + keywords[2] + '</p>'
	inner("keyWords", kwDiv, true)
}

function updateURL(item) {
	const baseUrl = window.location.origin + window.location.pathname;
	const params = new URLSearchParams();
	params.set("narrative", currentNarrative);

	// Encode the `shortName` to make it URL-safe
	const encodedShortName = encodeURIComponent(item.shortName);

	// Append the `shortName` to the URL as a slug or query parameter
	history.replaceState(null, "", `${baseUrl}?${params.toString()}&item=${encodedShortName}`);
}



function changeNarrative1(narrative, value) {
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
}

function createNarrativeLink(narrative, item) {
	const baseUrl = window.location.origin + window.location.pathname;
	return `${baseUrl}?narrative=${encodeURIComponent(narrative)}&item=${encodeURIComponent(item.shortName)}`;
}

