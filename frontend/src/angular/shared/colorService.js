"use strict";

angular.module('ColorService', [])
  .factory('Colors', [function() {
    
    return {
  
      HSVtoRGB: function(h, s, v) {
        /* accepts parameters
         * h  Object = {h:x, s:y, v:z}
         * OR 
         * h, s, v
        */
        var r, g, b, i, f, p, q, t;
        if (h && s === undefined && v === undefined) {
          s = h.s; 
          v = h.v; 
          h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
          case 0: r = v; g = t; b = p; break;
          case 1: r = q; g = v; b = p; break;
          case 2: r = p; g = v; b = t; break;
          case 3: r = p; g = q; b = v; break;
          case 4: r = t; g = p; b = v; break;
          case 5: r = v; g = p; b = q; break;
        }
        return {
          r: Math.floor(r * 255),
          g: Math.floor(g * 255),
          b: Math.floor(b * 255)
        };
      },

      generateColors: function(total) {
      //  var total = Object.keys($scope.spectra).length
      //  total += Object.keys($scope.pdfs).length

        var phi = 0.618033988749895,
          h = Math.random(),
          colors = ["#000"];


        for (var i=0; i < total; i++) {
          h += phi;
          h %= 1;
          var c = this.HSVtoRGB(h, 0.85, 0.6);
          colors.push("rgb(" + c.r + "," + c.g + "," + c.b + ")");
        }
        return colors;
      }
    };
  }]);