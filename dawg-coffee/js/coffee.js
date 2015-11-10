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
		.state('beans', {
			url: '/orders/{id}',
			templateUrl: 'partials/esp-blend.html',
			controller: 'BeansCtrl'
		})
		// .state('captain-ballards-blend', {
		// 	url: '/orders/captain-ballards-blend',
		// 	templateUrl: 'partials/captain-ballards-blend.html',
		// 	controller: 'BeansCtrl'
		// })
		// .state('frech-roast', {
		// 	url: '/orders/frech-roast',
		// 	templateUrl: 'partials/frech-roast.html',
		// 	controller: 'BeansCtrl'
		// })
		// .state('sumatran', {
		// 	url: '/orders/sumatran',
		// 	templateUrl: 'partials/sumatran.html',
		// 	controller: 'BeansCtrl'
		// })
		// .state('ethiopian', {
		// 	url: '/orders/ethiopian',
		// 	templateUrl: 'partials/ethiopian.html',
		// 	controller: 'BeansCtrl'
		// })
		// .state('roasters-choice', {
		// 	url: '/orders/roasters-choice',
		// 	templateUrl: 'partials/roasters-choice.html',
		// 	controller: 'BeansCtrl'
		// })
		// .state('premium-java', {
		// 	url: '/orders/premium-java',
		// 	templateUrl: 'partials/premium-java.html',
		// 	controller: 'BeansCtrl'
		// })
		// .state('kona', {
		// 	url: '/orders/kona',
		// 	templateUrl: 'partials/kona.html',
		// 	controller: 'BeansCtrl'
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

.controller('BeansCtrl', ['$scope', '$http', '$stateParams', '$filter', function($scope, $http, $stateParams, $filter) {

	$http.get('data/products.json').then(function(response) {
	   	$scope.bean = $filter('filter')(response.data, { //filter the array
	      id: $stateParams.id //for items whose id property is targetId
	   	}, true)[0]; //save the 0th result
 	});


}])
