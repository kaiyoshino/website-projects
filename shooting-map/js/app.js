
'use strict';

var map = L.map('map-container').setView([39.8282, -98.5795], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia2FpeW9zaCIsImEiOiJjaWZ0eHVhenExZXdodWhtMmEzZDA1dDB6In0.PEbxwlAVJP5m-c7MqnTqKA'
}).addTo(map);

var unknown = L.layerGroup([]).addTo(map);
var	white = L.layerGroup([]).addTo(map);
var	black = L.layerGroup([]).addTo(map);
var	asian = L.layerGroup([]).addTo(map);
var	indian = L.layerGroup([]).addTo(map);
var	pacific = L.layerGroup([]).addTo(map);

var myLayerGroups = {
	"Unknown": unknown,
	"White": white,
	"Black or African American": black,
	"Asian": asian,
	"American Indian or Alaska Native": indian,
	"Native Hawaiian or Other Pacific Islander": pacific
}

//, unknown, white, black, asian, indian, pacific

L.control.layers(null, myLayerGroups).addTo(map);

map.on('overlayadd overlayremove', function() {
	killed = 0;
	hit = 0;
	countKills(unknown);
	countKills(white);
	countKills(black);
	countKills(asian);
	countKills(indian);
	countKills(pacific);
});

var killed = 0;
var hit = 0;


var countKills = function(layerGroup) {
	if (map.hasLayer(layerGroup)) {
		layerGroup.getLayers().forEach(function(marker) {
			if (marker.options.outcome == "Killed") {
				killed++;
			} else {
				hit++;
			}
		})
	}
	document.getElementById("killed").innerHTML = killed;
	document.getElementById("hit").innerHTML = hit;
}

var doSomethingWithData = function(data) {
	data.forEach(function(shooting) {

		var markerColor;
		if (shooting.victim.age < 18) {
	    	markerColor = 'green'
		} else if (shooting.victim.age < 25) {
			markerColor = 'blue'
		} else {
			markerColor = 'red'
		};

		var marker = L.circle([shooting.lat, shooting.lng], 500, {
			color: markerColor,
		    fillColor: '#f03',
		    fillOpacity: 0.25,
		    ['outcome']: shooting.outcome
		}).bindPopup(shooting.summary + "(link)".link(shooting.sourceUrl));

		if (shooting.outcome == "Killed") {
				killed++;
			} else {
				hit++;
			}

		if(shooting.victim.race == "Unknown" || shooting.victim.race == null) {
			marker.addTo(unknown);
		} else if (shooting.victim.race == "White") {
			marker.addTo(white);
		} else if (shooting.victim.race == "Black or African American") {
			marker.addTo(black);
		} else if (shooting.victim.race == "Asian") {
			marker.addTo(asian);
		} else if (shooting.victim.race == "American Indian or Alaska Native") {
			marker.addTo(indian);
		} else if (shooting.victim.race == "Native Hawaiian or Other Pacific Islander") {
			marker.addTo(pacific);
		}
	});
	document.getElementById("killed").innerHTML = killed;
	document.getElementById("hit").innerHTML = hit;
}

$.getJSON('data/data.min.json').then(doSomethingWithData);
