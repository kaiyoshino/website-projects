'use strict';

var BASE_URL = 'https://api.soundcloud.com'; //website we fetch information from
var CLIENT_ID = 'c67c94fac9915ed0ad161e7a8d56cbe0' //application ID for requests

SC.initialize({
  client_id: 'c67c94fac9915ed0ad161e7a8d56cbe0',
  redirect_uri: 'http://http://students.washington.edu/kaiyosh/info343/challenges/soundcloud/'
});



var myApp = angular.module('myApp', [])
  .controller('MyCtrl', ['$scope', '$http', function($scope, $http) { 

  	$scope.doit= function(uri){
  		var widgetIframe = document.getElementById('sc-widget'),
        widget = SC.Widget(widgetIframe);
	    widget.bind(SC.Widget.Events.READY, function() {
	        widget.load(uri, {
            	show_artwork: false,
            	auto_play: true
        	});
	    });
	}
  
    //function called to fetch tracks based on the scope's query
    $scope.getTracks = function() {
    	if ($('#search').val().length > 1 ) {
			var request = BASE_URL + '/tracks' + '?' +'client_id='+ CLIENT_ID + '&q=' + $scope.query; //build the RESTful request
			$http.get(request) //Angular AJAX call
			.then(function (response) {
				$scope.tracks = response.data; //save results to available model
			});
		}
    };

}])
