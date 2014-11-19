'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:CreatemodalCtrl
 * @description
 * # CreatemodalCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('CreatemodalCtrl', function ($scope, $modalInstance, Autocomplete, PlayDate, Search) {
  	//these will be resolved when opening the modal
  	$scope.newPlayDate = {};
  	$scope.playDateMaster = {};
  	$scope.errorMessage = null;
  	$scope.successMessage = null;
  	$scope.saving = false;
  	$scope.getSteamgame = Autocomplete.getSteamgame;
  	$scope.getLanguage = Autocomplete.getLanguage;
  	$scope.getRegion = Autocomplete.getRegion;

	$scope.save = function () {
		$scope.saving = true;
		$scope.errorMessage = null;
		$scope.successMessage = null;
		var that = $scope;
		PlayDate.save($scope.newPlayDate).$promise.then(
			function(playdate){
			//success
				console.log(playdate);
				that.saving = false;
				that.newPlayDate = angular.copy(that.playDateMaster);
				Search.findPlayDates({});
				$modalInstance.dismiss('success');
			},
			function(err){
				that.saving = false;
				that.errorMessage = err.data;
				//error
			}
		);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

  });
