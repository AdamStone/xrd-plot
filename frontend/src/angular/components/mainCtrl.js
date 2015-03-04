"use strict";

angular.module('MainController', [])
  .controller('Main', ['$scope', 'Colors', function($scope, Colors) {
    
    $scope.spectra = {};
    $scope.pdfs = {};
    
    $scope.colors = Colors.generateColors(20);
    
    $scope.graph = {
      
      pdfScale: 50,

//      width: 650, 
//      height: 350,
//      margin: 30,
//      xmax: null,
//      logScale: false,
      
//      fill: '#e00',
//      showFill: false,
//      getFill: function() {
//        if (this.showFill) return this.fill;
//        else return 'none';
//      },  
      
//      stroke: '#00f',
//      showStroke: true,
//      getStroke: function() {
//        if (this.showStroke) return this.stroke;
//        else return 'none';
//      },
      
      getStyle: function(index) {
        return {
          "fill": 'none',
          "stroke": $scope.colors[index], 
          "stroke-width": 0.5
        };
      },
      
//      getPoints: function() {
//        var key0 = Object.keys($scope.files)[0];
//        var points = $scope.files[key0];
////        console.log(key0);
////        console.log(points);
//        if (points !== undefined) {
//          return points;
//        }
//        else 
//          return [];
//      }
      
    };    
  }]);