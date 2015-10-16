/* add your script methods and logic here */

'use strict';

var map = L.map('map-container').setView([39.8282, -98.5795], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia2FpeW9zaCIsImEiOiJjaWZ0eHVhenExZXdodWhtMmEzZDA1dDB6In0.PEbxwlAVJP5m-c7MqnTqKA'
}).addTo(map);

var doSomethingWithData = function(data) {
	var circle = L.circle([data.lat, data.lng], 500, {
	    color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.5
	}).addTo(map);
}

$.getJSON('data/data.min.json').then(doSomethingWithData);

