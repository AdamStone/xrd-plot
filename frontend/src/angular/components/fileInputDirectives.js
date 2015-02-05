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


angular.module('FileInputDirectives', [])
  .directive('pdfInput', [function() {
    return {
      restrict: 'E',
      templateUrl: 'pdfInputTemplate.html',
      replace: true,
      scope: {
        files: "=",
        scale: "="
      },
      link: function(scope, element, attributes) {
        
        var input = angular.element(element).find('[name="pdf-input"]');
        
        scope.addFiles = function() {
          input.click();
        };
        
        scope.clearFiles = function() {
          input.wrap('<form>').closest('form').get(0).reset();
          input.unwrap();
          scope.files = {};
        };
        
        scope.pickColor = function(index) {
          var colorInput = angular.element(element).find('[name="color-input-' + index + '"]');
          
          console.log(colorInput);
          colorInput.click();
        };        
        
        input.bind("change", function(changeEvent) {
          console.log('change triggered');
          var filesArray = changeEvent.target.files;
          
          scope.readers = [];
          for (var i=0; i < filesArray.length; i++) {
            
            scope.readers.push(new FileReader());
            
            scope.readers[i].onload = (function(filename) {
              var filename = filename;
              
              return function(loadEvent) {
                var lines = loadEvent.target.result.split(/[\r\n]+/g);
                var data = [];
                for (var j=0; j < lines.length; j++) {
                  if (lines[j].length > 1) {
                    var point = lines[j].split(/[ \t,]+/g);
                    
                    if (/[a-zA-Z]+/.test(point[0])) {
//                      console.log('metadata found:');
//                      console.log(point);
                    }
                    else {
                      var x = parseFloat(point[0]),
                          y = parseFloat(point[1]);
                      if (!isNaN(x) && !isNaN(y) && point[0] < 90) {
                        var under = (x*100 - x*100 % 5)/100;
                        var over = under + .05;

                        data.push({
                          x: under,
                          y: 0
                        });

                        data.push({
                          x: x,
                          y: y
                        });

                        data.push({
                          x: over,
                          y: 0
                        });
                      }
                    }
                  }
                };
                data.push({
                  x: 90,
                  y: 0
                });

                data.unshift({
                  x: 10,
                  y: 0
                });                
                scope.$apply(function() {
                  scope.files[filename] = {
                    filename: filename,
                    points: data,
                    color: generateColors(1)[1]
                    
                  };
                });
                
              };
            })(filesArray[i]['name']);
            
            scope.readers[i].readAsText(filesArray[i]);

          };
          
        });
        
        
      }
    };
  }])





  .directive('xyInput', [function() {
    return {
      restrict: 'E',
      templateUrl: 'xyInputTemplate.html',
      replace: true,
      scope: {
        files: "="
      },
      link: function(scope, element, attributes) {
        
        var input = angular.element(element).find('[name="spectra-input"]');
        
        scope.addFiles = function() {
          input.click();
        };
        
        scope.clearFiles = function() {
          input.wrap('<form>').closest('form').get(0).reset();
          input.unwrap();
          scope.files = {};
        };        
        
        scope.pickColor = function(index) {
          var colorInput = angular.element(element).find('[name="color-input-' + index + '"]');
          
          console.log(colorInput);
          colorInput.click();
        };        
        
        input.bind("change", function(changeEvent) {
          var filesArray = changeEvent.target.files;
          
          scope.readers = [];
          for (var i=0; i < filesArray.length; i++) {
            
            scope.readers.push(new FileReader());
            
            scope.readers[i].onload = (function(filename) {
              var filename = filename;
              
              return function(loadEvent) {
                var lines = loadEvent.target.result.split(/[\r\n]+/g);
                var data = [];
                for (var j=0; j < lines.length; j++) {
                  if (lines[j].length > 1) {
                    var point = lines[j].split(/[ \t,]+/g);
                    if (point.length == 2) {
                      var x = parseFloat(point[0]),
                          y = parseFloat(point[1]);
                      if (!isNaN(x) && !isNaN(y)) {
                        data[j] = {
                          x: x,
                          y: y
                        };
                      }
                    }
                  }
                };
                scope.$apply(function() {
                  scope.files[filename] = {
                    filename: filename,
                    points: data,
                    color: generateColors(1)[1]
                    
                  };
                });
                
              };
            })(filesArray[i]['name']);
            
            scope.readers[i].readAsText(filesArray[i]);

          };
          
        });
        
        
      }
    };
  }]);