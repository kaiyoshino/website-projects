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
		.state('cart', {
			url: '/cart',
			templateUrl: 'partials/cart.html',
			controller: 'CartCtrl'
		})
})

.config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
})

.controller('CartCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.orders = angular.fromJson(localStorage.getItem("order"));

	$scope.delete = function (idx) {
		$scope.orders.splice(idx, 1);
		localStorage.clear();
		localStorage.setItem("order", angular.toJson($scope.orders));
	};

	$scope.increase = function (idx, order) {
		order.quantity++;
		$scope.orders.splice(idx, 1, order);
		localStorage.clear();
		localStorage.setItem("order", angular.toJson($scope.orders));
	};

	$scope.decrease = function (idx, order) {
		order.quantity--;
		$scope.orders.splice(idx, 1, order);
		localStorage.clear();
		localStorage.setItem("order", angular.toJson($scope.orders));
	};

	$scope.total = function() {
		return $scope.orders.reduce(function(current, order) { return current + (order.quantity * order.price); }, 0);
	};

}])

.controller('OrdersCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('data/products.json').then(function(response) {
	 		$scope.beans = response.data;
	});
}])

.controller('BeansCtrl', ['$scope', '$http', '$stateParams', '$filter', function($scope, $http, $stateParams, $filter) {

	$http.get('data/products.json').then(function(response) {
	   	$scope.bean = $filter('filter')(response.data, { 
	      id: $stateParams.id 
	   	}, true)[0]; 
 	});

 	$scope.getOrder = function(name, price) {
		var order = []
		order[0] = {'quantity':$scope.order.quantity, 'grind':$scope.order.grind, 'name':name, 'price':price};
		if(typeof(Storage) !== "undefined") {
			if(localStorage.getItem("order") == null) {
				localStorage.setItem("order", angular.toJson(order));
			} else {
				var orderTemp = angular.fromJson(localStorage.getItem("order"));
				orderTemp.push({'quantity':$scope.order.quantity, 'grind':$scope.order.grind, 'name':name, 'price':price});
				localStorage.clear();
				localStorage.setItem("order", angular.toJson(orderTemp));
			}
		} else {
			
		}	
	}
}])
