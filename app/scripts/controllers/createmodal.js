'use strict';

/**
 * @ngdoc function
 * @name findPlayDate.controller:CreatemodalCtrl
 * @description
 * # CreatemodalCtrl
 * Controller of the findPlayDate
 */
 angular.module('findPlayDate')
 .controller('CreatemodalCtrl', function ($scope, $modalInstance, Autocomplete, PlayDate, Search, newPlayDate) {
    //these will be resolved when opening the modal
    $scope.newPlayDate = angular.copy(newPlayDate);
    $scope.playDateMaster = {};
    $scope.errorMessage = null;
    $scope.successMessage = null;
    $scope.saving = false;
    $scope.getSteamgame = Autocomplete.getSteamgame;
    $scope.getLanguage = Autocomplete.getLanguage;
    $scope.getRegion = Autocomplete.getRegion;

    $scope.save = function () {
        if(!$scope.createForm.$dirty || !$scope.createForm.$valid) {
            $scope.errorMessage = "Please fill out all fields and try again";
            return;
        }
        $scope.saving = true;
        $scope.errorMessage = null;
        $scope.successMessage = null;
        var that = $scope;
        PlayDate.save($scope.newPlayDate).$promise.then(
            function(playdate){
                //success
                that.saving = false;
                that.newPlayDate = angular.copy(that.playDateMaster);
                Search.findPlayDates({});
                $modalInstance.dismiss('success');
            },
            function(err){
                that.saving = false;
                that.errorMessage = 'There has been an error saving your PlayDate. Please contact the admin with the following information: ' + angular.toJson(that.newPlayDate);
            }
            );
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
