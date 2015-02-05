angular.module('D3Service', [])
  .factory('D3', [function() {
    
    var getXY = function(points, width, height) {
      var x = d3.scale.linear()
        .range([0, width])
        .domain(d3.extent(points, function(d) { return d.x }));

      var y = d3.scale.linear()
        .range([height, 0])
        .domain(d3.extent(points, function(d) { return d.y }));
      
      return [x, y];
    };
    
    return {
      
      buildPath: function(points, width, height) {
        var xy = getXY(points, width, height),
            x = xy[0],
            y = xy[1];
        return d3.svg.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });;
      },
      
      
      
      
      buildAxes: function(points, width, height, mountpoint) {
        var xy = getXY(points, width, height),
            x = xy[0],
            y = xy[1];
        
        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");
        xAxis(mountpoint);
        var tickNumbers = mountpoint.find('text');
        tickNumbers.attr("dy", "10px");
      }
      
    };
  }])