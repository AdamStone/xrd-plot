"use strict";

angular.module('MainController', [])
  .controller('Main', ['$scope', 'Colors', function($scope, Colors) {

    $scope.spectra = {};
    $scope.pdfs = {};

    $scope.colors = Colors.generateColors(20);

    $scope.graph = {

      pdfScale: 50,

      getStyle: function(index) {
        return {
          "fill": 'none',
          "stroke": $scope.colors[index],
          "stroke-width": 0.5
        };
      }
    };
  }]);
