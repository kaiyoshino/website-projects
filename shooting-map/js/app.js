
'use strict';

var map = L.map('map-container').setView([39.8282, -98.5795], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia2FpeW9zaCIsImEiOiJjaWZ0eHVhenExZXdodWhtMmEzZDA1dDB6In0.PEbxwlAVJP5m-c7MqnTqKA'
}).addTo(map);

var unknown = L.layerGroup([]);
var	white = L.layerGroup([]);
var	black = L.layerGroup([]);
var	asian = L.layerGroup([]);
var	indian = L.layerGroup([]);
var	pacific = L.layerGroup([]);

var overlayMaps = {
	"Uknown": unknown,
	"White": white,
	"Black or African American": black,
	"Asian": asian,
	"American Indian or Alaska Native": indian,
	"Native Hawaiian or Other Pacific Islander": pacific
}

L.control.layers(overlayMaps).addTo(map);

var doSomethingWithData = function(data) {
	data.forEach(function(shooting) {

		var markerColor;
		if (shooting.victim.age < 18) {
	    	markerColor = 'black'
		} else if (shooting.victim.age < 25) {
			markerColor = 'blue'
		} else {
			markerColor = 'red'
		};

		var marker = L.circle([shooting.lat, shooting.lng], 500, {
			color: markerColor,
		    fillColor: '#f03',
		    fillOpacity: 0.25
		}).bindPopup(shooting.summary + "(link)".link(shooting.sourceURL));


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


}


$.getJSON('data/data.min.json').then(doSomethingWithData);
