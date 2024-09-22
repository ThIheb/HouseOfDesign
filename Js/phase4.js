var items = []
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
			var person = items[startWith]

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
	var person = currentSelection[index]
	currentSort = person['@sort']
	inner("header", person.shortName);
	inner("type-info", person.info.Type);
	inner("fullHeader", person.shortName);
	byId("img").src = person.image
	byId("img").alt = person.shortName
	createInfoTable(person)
	inner("shortInfo", person.shortInfo + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="more()">Tell me more...</a>');
	inner("longerInfo", "<p>" + person.longerInfo.join("</p><p>") + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="less()">Tell me less</a> or <a type="button" class="btn btn-outline-primary btn-sm" onclick="muchMore()">Tell me even more...</a></p>');
	byId("fullInfo").dataset['uri'] = person.fullInfo

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
	const firstSectionKeys = ["Name", "key2", "key3"]; // Keys for the first section
	const secondSectionKeys = ["Manufacturer", "key5", "key6"]; // Keys for the second section

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
}


