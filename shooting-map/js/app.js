/* add your script methods and logic here */

'use strict';

var map = L.map('map-container').setView([39.8282, -98.5795], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia2FpeW9zaCIsImEiOiJjaWZ0eHVhenExZXdodWhtMmEzZDA1dDB6In0.PEbxwlAVJP5m-c7MqnTqKA'
}).addTo(map);

var unknown = L.layerGroup();
var	white = L.layerGroup();
var	black = L.layerGroup();
var	asian = L.layerGroup();
var	indian = L.layerGroup();
var	pacific = L.layerGroup();

// var shootingPopUp = {
// 	lat: '',
// 	lng: '',
// 	sum: ''
// };


var doSomethingWithData = function(data) {
	data.forEach(function(shooting) {

		var marker = L.circle([shooting.lat, shooting.lng], 500, {
		    color: 'red',
		    fillColor: '#f03',
		    fillOpacity: 0.5
		}).bindPopup(shooting.summary + "(link)".link(shooting.sourceURL)).addTo(map);

		// shootingPopUp.lat = shooting.lat;
		// shootingPopUp.lng = shooting.lng;
		// shootingPopUp.sum = shooting.summary;



		if(shooting.race == "Uknown") {
			marker.addTo(unknown);
		} else if (shooting.race == "White") {
			marker.addTo(white);
		} else if (shooting.race == "Black or African American") {
			marker.addTo(black);
		} else if (shooting.race == "Asian") {
			marker.addTo(asian);
		} else if (shooting.race == "American Indian or Alaska Native") {
			marker.addTo(indian);
		} else if (shooting.race == "Native Hawaiian or Other Pacific Islander") {
			marker.addTo(pacific);
		}
	});

	L.control.layers(unknown, white, black, asian, indian, pacific).addTo(map);
}

$.getJSON('data/data.min.json').then(doSomethingWithData);


// function onMapClick(shootingPopUp) {
// 	var popup = L.popup()
// 		.setLatLng([shootingPopUp.lat, shootingPopUp.lng])
// 		.setContent(shootingPopUp.sum)
// 		.openOn(map);
// }

// map.on('click', onMapClick)