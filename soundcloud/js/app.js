'use strict';

var BASE_URL = 'https://api.soundcloud.com'; //website we fetch information from
var CLIENT_ID = 'c67c94fac9915ed0ad161e7a8d56cbe0' //application ID for requests

SC.initialize({
  client_id: 'c67c94fac9915ed0ad161e7a8d56cbe0',
  redirect_uri: 'http://http://students.washington.edu/kaiyosh/info343/challenges/soundcloud/'
});

// var iframeElement   = document.querySelector('iframe');
// var iframeElementID = iframeElement.id;
// var widget1         = SC.Widget(iframeElement);
// var widget2         = SC.Widget(iframeElementID);

SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});

// SC.get('chancetherapper/tracks').then(function(tracks){
//   alert('Latest track: ' + tracks[0].title);
// });

var track_url = 'http://soundcloud.com/forss/flickermood';
SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
  console.log('oEmbed response: ', oEmbed);
  player.play();
});

// soundcloud.addEventListener('onPlayerReady', function(player, data) {
//      player.api_play();
//    });

// var flashvars = {
//   enable_api: true,
//   object_id: "myPlayer",
//   url: "http://soundcloud.com/forss/flickermood"
// };

// var params = {
//   allowscriptaccess: "always"
// };

// var attributes = {
//   id: "myPlayer",
//   name: "myPlayer"
// };

// swfobject.embedSWF("http://player.soundcloud.com/player.swf", "myContent", "81", "100%", "9.0.0","expressInstall.swf", flashvars, params, attributes);
// var track_url = 'http://soundcloud.com/forss/flickermood';


var myApp = angular.module('myApp', [])
  .controller('MyCtrl', ['$scope', '$http', function($scope, $http) { 
  
    //function called to fetch tracks based on the scope's query
    $scope.getTracks = function() {
    	if ($('#search').val().length > 0 ) {
			var request = BASE_URL + '/tracks' + '?' +'client_id='+ CLIENT_ID + '&q=' + $scope.query; //build the RESTful request
			$http.get(request) //Angular AJAX call
			.then(function (response) {
				$scope.tracks = response.data; //save results to available model
			});
		}
    };
}])
