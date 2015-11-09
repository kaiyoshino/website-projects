'use strict';

angular.module('CoffeeApp', ['ui.router'])
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) { 


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
		// .state('esp-blend', {
		// 	url: '/orders/espresso-blend'
		// 	templateUrl: '',
		// 	controller: 'DetailsCtrl'
		// })
})

.config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
})

.controller('OrdersCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('data/products.json').then(function(response) {
	 		$scope.beans = response.data;
	});

}])
