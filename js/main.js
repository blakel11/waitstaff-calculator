angular.module('myApp', ['ngMessages', 'ngRoute', 'ngAnimate'])
	.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 2000);
    })
  })
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'MyCtrl'
		})
		.when('/new-meal', {
			templateUrl: 'new-meal.html',
			controller: 'MyCtrl'
		})
		.when('/my-earnings', {
			templateUrl: 'my-earnings.html',
			controller: 'MyCtrl'
		})
		.otherwise('/');

	}])
	.controller('MyCtrl', ['$scope', function($scope){
		$scope.metrics = {
			subTotal : null,
			tip : null,
			tipTotal : null,
			mealCount : null
		};

		$scope.calc = {};

		$scope.submit = function(){
			if($scope.detailsForm.$valid) {
				console.log('This is valid');
				$scope.metrics.subTotal = $scope.calc.basePrice * (1 + ($scope.calc.taxRate/100));
				$scope.metrics.tip = $scope.calc.basePrice * ($scope.calc.tip/100);

				$scope.metrics.tipTotal += $scope.calc.basePrice * ($scope.calc.tip/100);
				$scope.metrics.mealCount ++;

				$scope.calc = {};
				$scope.detailsForm.$pristine = true;
			} else {
				console.log('This is invalid');
			}
		};
		$scope.cancel = function(){
			console.log('Canceling Order');
			$scope.calc = {};
			$scope.detailsForm.$pristine = true;
		};
		$scope.reset = function(){
			console.log('Resetting Calculator');
			$scope.calc = {};
			$scope.metrics = {};
			//$scope.detailsForm.$pristine = true;
		};
	}]);