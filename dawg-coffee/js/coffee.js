'use strict';

angular.module('CoffeeApp', ['ui.router'])
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) { 

	$http.get('data/products.json').then(function(response) {
	 		$scope.beans = response.data;
	 	});

		 	// $scope.saveBean = function(bean) {
		 	// 	bean.title = bean.name;
		 	// 	bean.desc = bean.description;
		 	// 	bean.cost = bean.price;
		 	// 	watchList.saveFilm(movie);
		 	// 	console.log("saved ")
		 	// 	console.log(movie);
		 	// }

  //   	if ($('#search').val().length > 0 ) {
		// 	// $http.get(request) //Angular AJAX call
		// 	// .then(function (response) {
		// 	// 	$scope.beans = response.data; //save results to available model
		// 	// });
		// } else {

		// }

}])

.config(function($stateProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'index.html',
			controller: 'HomeCtrl'
		})
		.state('orders', {
			url: '/orders',
			templateUrl: 'partials/order.html',
			controller: 'OrdersCtrl'
		})
})

.config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
})

.controller('OrdersCtrl', ['$scope', '$http', function($scope, $http) {



}])
