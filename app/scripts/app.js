'use strict';
/**
 * @ngdoc overview
 * @name htdocsApp
 * @description
 * # htdocsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('htdocsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngTagsInput',
    'wu.masonry',
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main',
      })
      .when('/update/:id/:hash', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main',
      })
      .when('/delete/:id/:hash', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main',
      })
      .when('/tos', {
        templateUrl: 'views/tos.html',
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(false);


  });

app.factory('PlayDate', function($resource) {

  return $resource('/api/playdate/:id/:parname/:updateHash/',
    {
      id: '@id',
      updateHash: '@updateHash',
    },
    {
      getForUpdate: {
        method: 'GET',
        params: {
          parname: 'hash',
          id: '@_id',
          updateHash: '@updateHash',
        }
      },
      update: {
        method: 'POST',
        params: {
          parname: 'hash',
          id: '@_id',
          updateHash: '@updateHash',
        }
      },
      disable: {
        method: 'DELETE',
        params: {
          parname: 'hash',
          id: '@_id',
          updateHash: '@updateHash',
        }
      }
    });
});

