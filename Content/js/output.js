/**
 * GulpStarter - Gulp Starter
 * @version v0.1.0
 * @repo https://github.com/npm/npm.git
 * @license ISC
 * @who David Potgieter
 */
'use strict';

var app = angular.module('app', ['ui.router']);

app.constant('$globals', {
	baseURL: 'build/base/ng/views/'
});

app.run(function ($stateParams, $state, $rootScope) {
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {});
});

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$globals', function ($stateProvider, $urlRouterProvider, $locationProvider, $globals) {
	$urlRouterProvider.otherwise('/welcome');
	$locationProvider.html5Mode({ enabled: false, requireBase: false });
	$stateProvider.state('home', {
		url: '/',
		controller: 'baseController',
		templateUrl: $globals.baseURL + 'main.html',
		pageTitle: "Welcome",
		pageIntro: ""
	}).state('typography', {
		url: '/typography',
		controller: 'baseController',
		templateUrl: $globals.baseURL + 'typography.html',
		pageTitle: "Typography!",
		pageIntro: "Base styles for all fonts and texts"
	}).state('icons', {
		url: '/icons',
		controller: 'baseController',
		templateUrl: $globals.baseURL + 'icons.html',
		pageTitle: "Icons!",
		pageIntro: "Available font icons"
	}).state('buttons', {
		url: '/buttons',
		controller: 'baseController',
		templateUrl: $globals.baseURL + 'buttons.html',
		pageTitle: "Buttons!",
		pageIntro: "Base styles for all links and buttons"
	});
}]);
'use strict';

app.directive('uiButton', ['$animate', function ($animate) {
    return {
        link: function link($scope, $element, $attrs) {
            $scope.$watch(function () {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function (valnew, valold) {
                $animate.enabled(!!valnew, $element);
            });
        }
    };
}]);
'use strict';

app.service('globals', ['', function () {
    return {
        someval: 'anonymous'
    };
}]);
'use strict';

app.controller('baseController', ['$scope', '$rootScope', '$location', '$state', '$globals', function ($scope, $rootScope, $location, $state, $globals) {

    $rootScope.stateConfig = _.findWhere($state.get(), { name: $state.current.name });
    $rootScope.baseURL = $globals.baseURL;

    function init() {}
    init();
}]);
'use strict';

app.controller('navController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    function init() {
        console.log('nav controller');
    }
    init();
}]);