'use strict';

var BASE_URL = 'https://api.soundcloud.com'; //website we fetch information from
var CLIENT_ID = 'c67c94fac9915ed0ad161e7a8d56cbe0' //application ID for requests

SC.initialize({
  client_id: 'c67c94fac9915ed0ad161e7a8d56cbe0',
  redirect_uri: 'http://http://students.washington.edu/kaiyosh/info343/challenges/soundcloud/'
});

  (function(){
    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe),
        newSoundUrl = 'http://api.soundcloud.com/tracks/13692671';

    widget.bind(SC.Widget.Events.READY, function() {
      // load new widget
      $('#play').click(function() {
        widget.load(newSoundUrl, {
          show_artwork: false
        });
      });
    });

  }());

  

// var track_url = 'http://soundcloud.com/forss/flickermood';
// SC.oEmbed(track_url, document.getElementById('player')).then(function(oEmbed) {
//   player.play();
// });


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
