app.controller('baseController',['$scope','$rootScope','$location','$state','$globals',
    function ($scope,$rootScope,$location,$state,$globals){

        $rootScope.stateConfig = _.findWhere($state.get(),{name:$state.current.name});
        $rootScope.baseURL = $globals.baseURL;

        function init(){

        }
        init();

}]);