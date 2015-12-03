	var app = angular.module('app',['ui.router']);

	app.constant('$globals', {
	    baseURL: 'build/base/ng/views/'
	});

	app.run(function($stateParams,$state,$rootScope) {
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){});
	});

	app.config(['$stateProvider','$urlRouterProvider','$locationProvider','$globals',
		function($stateProvider,$urlRouterProvider,$locationProvider,$globals) {
			$urlRouterProvider.otherwise('/welcome');
			$locationProvider.html5Mode({enabled: false,requireBase: false});
			$stateProvider
				.state('home', {
					url: '/',
					controller  : 'baseController',
					templateUrl : $globals.baseURL+'main.html',
					pageTitle   : "Welcome",
					pageIntro   : ""
				})
				.state('typography', {
					url: '/typography',
					controller  : 'baseController',
					templateUrl : $globals.baseURL+'typography.html',
					pageTitle   : "Typography!",
					pageIntro   : "Base styles for all fonts and texts"
				})
				.state('icons', {
					url: '/icons',
					controller  : 'baseController',
					templateUrl : $globals.baseURL+'icons.html',
					pageTitle   : "Icons!",
					pageIntro   : "Available font icons"
				})
				.state('buttons', {
					url: '/buttons',
					controller  : 'baseController',
					templateUrl : $globals.baseURL+'buttons.html',
					pageTitle   : "Buttons!",
					pageIntro   : "Base styles for all links and buttons"
				});

	}]);
