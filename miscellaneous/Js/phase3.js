var people = []
var currentNarrative = []

document.addEventListener("DOMContentLoaded", async function(event) {
	console.log("Ready to start")
	fetch('data/infoPhase3.json')
	.then(response => response.json())
	.then(data => {	
		people = data.people
		var startWith = data.meta.startWith
		var narrative = data.meta.narrative
		var startValue = data.meta.startValue
		var person = people[startWith]
		prepareNarratives(narrative,startValue)
	})
});

function showInfo(index) {
	var person = currentNarrative[index]
	var header = document.getElementById("header")
	header.innerHTML = person.shortName
	var header2 = document.getElementById("fullHeader")
	header2.innerHTML = person.shortName
	var img = document.getElementById("img")
	img.src = person.image
	img.alt = person.shortName
	var infoTable = document.getElementById("infoTable")
	infoTable.innerHTML = ""
	for (i in person.info) {
		if (person.info[i] !== null) {
			infoTable.innerHTML += "<tr><th>"+i+"</th><td>"+person.info[i]+"</td></tr>"
		}
	}
	var shortInfo = document.getElementById("shortInfo")
	shortInfo.innerHTML = person.shortInfo + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="more()">Tell me more...</a>'
	var longerInfo = document.getElementById("longerInfo")
	longerInfo.innerHTML = "<p>"+person.longerInfo.join("</p><p>")+ '<a type="button" class="btn btn-outline-primary btn-sm" onclick="less()">Tell me less</a> or <a type="button" class="btn btn-outline-primary btn-sm" onclick="muchMore()">Tell me even more...</a></p>'
	var fullInfo = document.getElementById("fullInfo")
	fullInfo.dataset['uri'] = person.fullInfo
	var prev = document.getElementById("buttonPrevious")
	var next = document.getElementById("buttonNext")
	if (index > 0) {
		prev.disabled = false
		prev.onclick = () => showInfo(index-1)
	} else {
		prev.disabled = true
		prev.onclick = null
	}
	if (index < currentNarrative.length-1) {
		next.disabled = false
		next.onclick = () => showInfo(index+1)
	} else {
		next.disabled = true
		next.onclick = null
	}
}

function more() {
	var shortInfo = document.getElementById("shortInfo")
	var longerInfo = document.getElementById("longerInfo")
	var fullInfo = document.getElementById("fullInfo")
	shortInfo.classList.add('d-none')
	longerInfo.classList.remove('d-none')
	fullInfo.classList.add('d-none')
}
function less() {
	var shortInfo = document.getElementById("shortInfo")
	var longerInfo = document.getElementById("longerInfo")
	var fullInfo = document.getElementById("fullInfo")
	longerInfo.classList.add('d-none')
	shortInfo.classList.remove('d-none')
	fullInfo.classList.add('d-none')
}
function muchMore() {
	var fullInfo = document.getElementById("fullInfo")
	var fullInfoContent = document.getElementById("fullInfoContent")
	var mainCard = document.getElementById("mainCard")
	var uri = fullInfo.dataset['uri']
	fetch(uri)
	.then(response => response.text())
	.then(data => {	
		fullInfoContent.innerHTML = data
		window.scrollTo(0,0)
		mainCard.classList.add('d-none')
		fullInfo.classList.remove('d-none')
	})
}
function hideFullInfo() {
	var shortInfo = document.getElementById("shortInfo")
	var longerInfo = document.getElementById("longerInfo")
	var mainCard = document.getElementById("mainCard")
	var fullInfo = document.getElementById("fullInfo")
	longerInfo.classList.add('d-none')
	shortInfo.classList.remove('d-none')
	fullInfo.classList.add('d-none')
	mainCard.classList.remove('d-none')
}

function prepareNarratives(narrative,value) {
	currentNarrative = people.filter( i => 
		i.narratives[narrative].includes(value) 
	)
	currentNarrative.sort( (i,j) =>  
		i.narratives.surname < j.narratives.surname ? -1 : 1 
	)	
	showInfo(0)
}
