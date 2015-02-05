
// 1300 750 village, horse north

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/

var HSVtoRGB = function(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (h && s === undefined && v === undefined) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.floor(r * 255),
    g: Math.floor(g * 255),
    b: Math.floor(b * 255)
  };
}

var generateColors = function(total) {
//  var total = Object.keys($scope.spectra).length
//  total += Object.keys($scope.pdfs).length

  var phi = 0.618033988749895,
    h = Math.random(),
    colors = ["#000"]

  for (var i=0; i < total; i++) {
    h += phi;
    h %= 1;
    var c = HSVtoRGB(h, .85, .6);
    colors.push("rgb(" + c.r + "," + c.g + "," + c.b + ")");
  }
  return colors;
};

angular.module('MainController', [])
  .controller('Main', ['$scope', function($scope) {
    
    $scope.spectra = {};
    $scope.pdfs = {};
    
    $scope.colors = generateColors(20);
    
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
        }
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