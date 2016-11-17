/// <reference path="../.ref/js/openiz.js"/>
/// <reference path="../.ref/js/openiz-ng.js"/>
/// <reference path="../.ref/js/openiz-model.js"/>
/// <reference path="../.ref/lib/jquery.min.js"/>
/// <reference path="../.ref/lib/angular.min.js"/>

/**
 * Controller for your landing page
 */
layoutApp.controller('IndexController', ['$scope', function ($scope) {

    // You can do many things here, this particular controller just queries for all patients.
    OpenIZ.Patient.findAsync({
        query: {
            "genderConcept.mnemonic" : "male"
        },
        /** @param {OpenIZModel.Bundle} patientBundle */
        continueWith: function (patientBundle) {
            if(patientBundle.item != null)
            {
                $scope.results = {
                    total: patientBundle.totalResults,
                    patients: patientBundle.item
                }
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

}]);
