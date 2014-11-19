"use strict";var app=angular.module("htdocsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ngTagsInput","wu.masonry"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){c.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl as main"}).when("/update/:id/:hash",{templateUrl:"views/main.html",controller:"MainCtrl as main"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]);app.factory("PlayDate",["$resource",function(a){return a("\\:3000/api/playdate/:id/:parname/:updateHash/",{id:"@id",updateHash:"@updateHash"},{getForUpdate:{method:"GET",params:{parname:"hash",id:"@_id",updateHash:"@updateHash"}},update:{method:"POST",params:{parname:"hash",id:"@_id",updateHash:"@updateHash"}}})}]),angular.module("htdocsApp").controller("MainCtrl",["$scope","$modal","$routeParams","Search","PlayDate",function(a,b,c,d,e){this.data={playdates:[]},this.updateSearchData=function(a){console.log("updatesearchdata called"),console.log(a),this.data.playdates=a},this.openModal=function(a){var c=b.open({templateUrl:"views/modal.html",controller:"ModalCtrl",size:"lg",resolve:{message:function(){return{to:a.name,playdateId:a._id}}}});c.result.then(function(a){console.log(a)})},this.openUpdateModal=function(a,c){var e=b.open({templateUrl:"views/updatemodal.html",controller:"UpdatemodalCtrl",size:"lg",resolve:{playdate:function(){return a},updateHash:function(){return c}}});e.result.then(function(a){"success"===a&&d.findPlayDates({})})},this.receiveMore=function(a){console.log("receive more called"),console.log(a)},function(){d.registerObserverCallback(function(b){a.main.updateSearchData(b)}),d.registerPushCallback(function(b){a.main.receiveMore(b)}),console.log("[INIT MAIN]"),console.log(c),c.hash&&c.id&&e.getForUpdate({id:c.id,updateHash:c.hash}).$promise.then(function(b){a.main.openUpdateModal(b,c.hash),console.log(b)}),d.findPlayDates()}()}]),angular.module("htdocsApp").controller("HeaderCtrl",["$scope","$http","$modal","PlayDate","Search",function(a,b,c,d,e){this.search={},this.getSteamgame=function(a){return b.get("api/steamapps",{params:{q:a}}).then(function(a){return a.data})},this.getLanguage=function(a){return console.log(this.newPlayDate),a&&a.length>2?b.get("api/languages",{params:{q:a}}).then(function(a){return a.data}):void 0},this.openCreateModal=function(){var a=c.open({templateUrl:"views/createmodal.html",controller:"CreatemodalCtrl",size:"lg"});a.result.then(function(a){console.log(a)})},this.getRegion=function(a){return b.get("api/regions",{params:{q:a}}).then(function(a){return a.data})},this.savePlayDate=function(){this.saving=!0,this.errorMessage=null,this.successMessage=null;var a=this;d.save(this.newPlayDate).$promise.then(function(b){console.log(b),a.saving=!1,a.newPlayDate=angular.copy(a.playDateMaster),e.findPlayDates({})},function(b){a.saving=!1,a.errorMessage=b.data})},this.doSearch=function(){e.findPlayDates(this.search)}}]),angular.module("htdocsApp").factory("Search",["PlayDate",function(a){var b={observerCallbacks:[],pushCallbacks:[],results:[],page:1,finishedLoading:!1,isLoading:!1,findByPk:function(a){var b=[];return angular.forEach(this.results,function(b){b.id===a&&this.push(b)},b),b},registerObserverCallback:function(a){this.observerCallbacks.push(a)},registerPushCallback:function(a){this.pushCallbacks.push(a)},pushObservers:function(a){angular.forEach(this.pushCallbacks,function(b){b(a)})},notifyObservers:function(a){angular.forEach(this.observerCallbacks,function(b){b(a)})},loadMore:function(){if(!this.isLoading&&!this.finishedLoading){var b=this;this.page++,this.data.page=this.page,a.query(this.data).$promise.then(function(a){a.length||(b.finishedLoading=!0),b.pushObservers(a)})}},findPlayDates:function(b){console.log(b),b&&(this.data=b);var c=this;return a.query(b).$promise.then(function(a){c.notifyObservers(a),c.results=a})}};return b}]),angular.module("htdocsApp").factory("Autocomplete",["$http",function(a){var b={getSteamgame:function(b){return a.get("api/steamapps",{params:{q:b}}).then(function(a){return a.data})},getLanguage:function(b){return b&&b.length>2?a.get("api/languages",{params:{q:b}}).then(function(a){return a.data}):void 0},getRegion:function(b){return a.get("api/regions",{params:{q:b}}).then(function(a){return a.data})}};return b}]),angular.module("htdocsApp").controller("ModalCtrl",["$scope","$http","$modalInstance","message",function(a,b,c,d){a.message=d,a.send=function(){b.post("api/message",a.message,{params:{playdate_id:d.playdateId}}).success(function(){c.close()}).error(function(){console.log("fail")})},a.cancel=function(){c.dismiss("cancel")}}]),angular.module("htdocsApp").controller("UpdatemodalCtrl",["$scope","$modalInstance","playdate","updateHash","Autocomplete",function(a,b,c,d,e){a.playdate=c,a.updateHash=d,a.getSteamgame=e.getSteamgame,a.getLanguage=e.getLanguage,a.getRegion=e.getRegion,console.log(a.playdate),a.save=function(){a.playdate.updateHash=a.updateHash,a.playdate.$update().then(function(a){console.log(a),b.close("success")})},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("htdocsApp").controller("CreatemodalCtrl",["$scope","$modalInstance","Autocomplete","PlayDate","Search",function(a,b,c,d,e){a.newPlayDate={},a.playDateMaster={},a.errorMessage=null,a.successMessage=null,a.saving=!1,a.getSteamgame=c.getSteamgame,a.getLanguage=c.getLanguage,a.getRegion=c.getRegion,a.save=function(){a.saving=!0,a.errorMessage=null,a.successMessage=null;var c=a;d.save(a.newPlayDate).$promise.then(function(a){console.log(a),c.saving=!1,c.newPlayDate=angular.copy(c.playDateMaster),e.findPlayDates({}),b.dismiss("success")},function(a){c.saving=!1,c.errorMessage=a.data})},a.cancel=function(){b.dismiss("cancel")}}]);