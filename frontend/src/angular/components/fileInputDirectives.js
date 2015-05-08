"use strict";

angular.module('FileInputDirectives', [])
  .directive('pdfInput', ['Colors', function(Colors) {
    return {
      restrict: 'E',
      templateUrl: 'pdfInputTemplate.html',
      replace: true,
      scope: {
        files: "=",
        scale: "="
      },
      link: function(scope, element) {

        var input = angular.element(element)
          .find('[name="pdf-input"]');

        scope.addFiles = function() {
          input.click();
        };

        scope.clearFiles = function() {
          input.wrap('<form>').closest('form')
            .get(0).reset();
          input.unwrap();
          scope.files = {};
        };

        scope.pickColor = function(index) {
          var colorInput = angular.element(element)
            .find('[name="color-input-' + index + '"]');

          colorInput.click();
        };

        input.bind("change", function(changeEvent) {
          var filesArray = changeEvent.target.files;

          scope.readers = [];
          for (var i=0; i < filesArray.length; i++) {

            scope.readers.push(new FileReader());

            scope.readers[i].onload = (function(filename) {
              return function(loadEvent) {
                var lines = loadEvent.target.result.split(/[\r\n]+/g);
                var data = [];
                for (var j=0; j < lines.length; j++) {
                  if (lines[j].length > 1) {
                    var point = lines[j].split(/[ \t,]+/g);

                    if (/[a-zA-Z]+/.test(point[0])) {
                      // TODO process metadata line
                    }
                    else {
                      var x = parseFloat(point[0]),
                          y = parseFloat(point[1]);
                      if (!isNaN(x) && !isNaN(y) && point[0] < 90) {
                        var under = (x*100 - x*100 % 5)/100;
                        var over = under + 0.05;

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
                }

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
                    color: Colors.generateColors(1)[1]
                  };
                });
              };
            })(filesArray[i].name);

            scope.readers[i].readAsText(filesArray[i]);
          }
        });
      }
    };
  }])


  .directive('xyInput', ['Colors', function(Colors) {
    return {
      restrict: 'E',
      templateUrl: 'xyInputTemplate.html',
      replace: true,
      scope: {
        files: "="
      },
      link: function(scope, element) {

        var input = angular.element(element)
          .find('[name="spectra-input"]');

        scope.addFiles = function() {
          input.click();
        };

        scope.clearFiles = function() {
          input.wrap('<form>').closest('form').get(0).reset();
          input.unwrap();
          scope.files = {};
        };

        scope.pickColor = function(index) {
          var colorInput = angular.element(element)
            .find('[name="color-input-' + index + '"]');

          colorInput.click();
        };

        input.bind("change", function(changeEvent) {
          var filesArray = changeEvent.target.files;

          scope.readers = [];
          for (var i=0; i < filesArray.length; i++) {

            scope.readers.push(new FileReader());

            scope.readers[i].onload = (function(filename) {

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
                }
                scope.$apply(function() {
                  scope.files[filename] = {
                    filename: filename,
                    points: data,
                    color: Colors.generateColors(1)[1]
                  };
                });
              };
            })(filesArray[i].name);

            scope.readers[i].readAsText(filesArray[i]);
          }
        });
      }
    };
  }]);
