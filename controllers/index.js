/// <reference path="../.ref/js/openiz.js"/>
/// <reference path="../.ref/js/openiz-ng.js"/>
/// <reference path="../.ref/js/openiz-model.js"/>
/// <reference path="../.ref/lib/jquery.min.js"/>
/// <reference path="../.ref/lib/angular.min.js"/>

/**
 * Controller for your landing page
 */
angular.module('layout').controller('IndexController', ['$scope', '$rootScope', function ($scope, $rootScope) {


    $scope.search = {};

    // You can do many things here, this particular controller just queries for all patients.
    $scope.searchPatients = function () {
        OpenIZ.Patient.findAsync({
            query: {
                "name.component.value": $scope.search.name
            },
            /** @param {OpenIZModel.Bundle} patientBundle */
            continueWith: function (patientBundle) {
                if (patientBundle.item != null) {
                    $scope.results = {
                        total: patientBundle.totalResults,
                        patients: patientBundle.item
                    }
                    $scope.$apply();
                }
            },
            /** @param {OpenIZModel.Exception} ex */
            onException: function (ex) {
                alert(ex.message);
            },
            finally: function () {
                // Do something always
            }
        });
    }
}]);
