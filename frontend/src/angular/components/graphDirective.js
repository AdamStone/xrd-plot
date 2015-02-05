angular.module('GraphDirective', [])
  .directive('vectorGraph', ['D3', function(D3) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'graphTemplate.html',
      scope: {
        spectra: "=",
        pdfs: "=",
        graph: "=config"
      },
      link: function(scope, element, attributes) {
        
        scope.margin = 30;
        
        var svg = angular.element(element).find('svg')[0];
        scope.width = svg.clientWidth;
        scope.height = svg.clientHeight;
        
        scope.getSVGb64 = function() {
          var svg = angular.element(element).find('svg')
            .clone().wrap('<div/>').parent().html();
          return btoa(decodeURIComponent(encodeURIComponent(svg)));
        };
        
        scope.axisStyle = function() {
          return {
            "shape-rendering": "crispEdges",
            "stroke": "#000",
            "stroke-width": "1px",
            "fill": "none"
          }
        };
        
        scope.spectrumStyle = function(color) {
          return {
            "stroke": color,
            "stroke-width": "0.5px",
            "fill": "none"
          }
        };
        
        scope.pdfStyle = function(color) {
          return {
//            "shape-rendering": "crispEdges",
            "stroke": color,
            "stroke-width": "1px",
            "fill": "none"
          }
        };
        
        window.onresize = function() {          
          scope.$apply(function() {
            scope.width = svg.clientWidth;
            scope.height = svg.clientHeight;            
          });  
        };
        
        scope.paths = {};

        scope.getPath = function(points, scale) {
          var pointstring = JSON.stringify(points);
          if (!scale)
            scale = 1;
          var path = scope.paths[pointstring];
          if (!(pointstring in scope.paths) || path.height !== scope.height || path.width !== scope.width || path.scale !== scope.graph.pdfScale) {
            scope.paths[pointstring] = {
              path: D3.buildPath(points, scope.width-scope.margin*2, (scope.height-scope.margin*2)*scale)(points),
              width: scope.width,
              height: scope.height,
              scale: scope.graph.pdfScale
            };            
          }
          D3.buildAxes(points, scope.width-scope.margin*2, scope.height-scope.margin*2,  angular.element(element).find('.axis-group'));
          return scope.paths[pointstring].path;
        };
      }
    }
  }])