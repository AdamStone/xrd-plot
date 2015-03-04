"use strict";angular.module("DataAnalysis",["MainController","D3Service","ColorService","FileInputDirectives","GraphDirective"]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/)}]),angular.module("FileInputDirectives",[]).directive("pdfInput",["Colors",function(a){return{restrict:"E",templateUrl:"pdfInputTemplate.html",replace:!0,scope:{files:"=",scale:"="},link:function(b,c){var d=angular.element(c).find('[name="pdf-input"]');b.addFiles=function(){d.click()},b.clearFiles=function(){d.wrap("<form>").closest("form").get(0).reset(),d.unwrap(),b.files={}},b.pickColor=function(a){var b=angular.element(c).find('[name="color-input-'+a+'"]');console.log(b),b.click()},d.bind("change",function(c){console.log("change triggered");var d=c.target.files;b.readers=[];for(var e=0;e<d.length;e++)b.readers.push(new FileReader),b.readers[e].onload=function(c){return function(d){for(var e=d.target.result.split(/[\r\n]+/g),f=[],g=0;g<e.length;g++)if(e[g].length>1){var h=e[g].split(/[ \t,]+/g);if(/[a-zA-Z]+/.test(h[0]));else{var i=parseFloat(h[0]),j=parseFloat(h[1]);if(!isNaN(i)&&!isNaN(j)&&h[0]<90){var k=(100*i-100*i%5)/100,l=k+.05;f.push({x:k,y:0}),f.push({x:i,y:j}),f.push({x:l,y:0})}}}f.push({x:90,y:0}),f.unshift({x:10,y:0}),b.$apply(function(){b.files[c]={filename:c,points:f,color:a.generateColors(1)[1]}})}}(d[e].name),b.readers[e].readAsText(d[e])})}}}]).directive("xyInput",["Colors",function(a){return{restrict:"E",templateUrl:"xyInputTemplate.html",replace:!0,scope:{files:"="},link:function(b,c){var d=angular.element(c).find('[name="spectra-input"]');b.addFiles=function(){d.click()},b.clearFiles=function(){d.wrap("<form>").closest("form").get(0).reset(),d.unwrap(),b.files={}},b.pickColor=function(a){var b=angular.element(c).find('[name="color-input-'+a+'"]');console.log(b),b.click()},d.bind("change",function(c){var d=c.target.files;b.readers=[];for(var e=0;e<d.length;e++)b.readers.push(new FileReader),b.readers[e].onload=function(c){return function(d){for(var e=d.target.result.split(/[\r\n]+/g),f=[],g=0;g<e.length;g++)if(e[g].length>1){var h=e[g].split(/[ \t,]+/g);if(2==h.length){var i=parseFloat(h[0]),j=parseFloat(h[1]);isNaN(i)||isNaN(j)||(f[g]={x:i,y:j})}}b.$apply(function(){b.files[c]={filename:c,points:f,color:a.generateColors(1)[1]}})}}(d[e].name),b.readers[e].readAsText(d[e])})}}}]),angular.module("GraphDirective",[]).directive("vectorGraph",["D3",function(a){return{restrict:"E",replace:!1,templateUrl:"graphTemplate.html",scope:{spectra:"=",pdfs:"=",graph:"=config"},link:function(b,c){b.margin=30;var d=angular.element(c).find("svg")[0];b.width=d.clientWidth,b.height=d.clientHeight,b.getSVGb64=function(){var a=angular.element(c).find("svg").clone().wrap("<div/>").parent().html();return btoa(decodeURIComponent(encodeURIComponent(a)))},b.axisStyle=function(){return{"shape-rendering":"crispEdges",stroke:"#000","stroke-width":"1px",fill:"none"}},b.spectrumStyle=function(a){return{stroke:a,"stroke-width":"0.5px",fill:"none"}},b.pdfStyle=function(a){return{stroke:a,"stroke-width":"1px",fill:"none"}},window.onresize=function(){b.$apply(function(){b.width=d.clientWidth,b.height=d.clientHeight})},b.paths={},b.getPath=function(d,e){var f=JSON.stringify(d);e||(e=1);var g=b.paths[f];return f in b.paths&&g.height===b.height&&g.width===b.width&&g.scale===b.graph.pdfScale||(b.paths[f]={path:a.buildPath(d,b.width-2*b.margin,(b.height-2*b.margin)*e)(d),width:b.width,height:b.height,scale:b.graph.pdfScale}),a.buildAxes(d,b.width-2*b.margin,b.height-2*b.margin,angular.element(c).find(".axis-group")),b.paths[f].path}}}}]),angular.module("MainController",[]).controller("Main",["$scope","Colors",function(a,b){a.spectra={},a.pdfs={},a.colors=b.generateColors(20),a.graph={pdfScale:50,getStyle:function(b){return{fill:"none",stroke:a.colors[b],"stroke-width":.5}}}}]),angular.module("ColorService",[]).factory("Colors",[function(){return{HSVtoRGB:function(a,b,c){var d,e,f,g,h,i,j,k;switch(a&&void 0===b&&void 0===c&&(b=a.s,c=a.v,a=a.h),g=Math.floor(6*a),h=6*a-g,i=c*(1-b),j=c*(1-h*b),k=c*(1-(1-h)*b),g%6){case 0:d=c,e=k,f=i;break;case 1:d=j,e=c,f=i;break;case 2:d=i,e=c,f=k;break;case 3:d=i,e=j,f=c;break;case 4:d=k,e=i,f=c;break;case 5:d=c,e=i,f=j}return{r:Math.floor(255*d),g:Math.floor(255*e),b:Math.floor(255*f)}},generateColors:function(a){for(var b=.618033988749895,c=Math.random(),d=["#000"],e=0;a>e;e++){c+=b,c%=1;var f=this.HSVtoRGB(c,.85,.6);d.push("rgb("+f.r+","+f.g+","+f.b+")")}return d}}}]),angular.module("D3Service",[]).factory("D3",[function(){var a=function(a,b,c){var d=d3.scale.linear().range([0,b]).domain(d3.extent(a,function(a){return a.x})),e=d3.scale.linear().range([c,0]).domain(d3.extent(a,function(a){return a.y}));return[d,e]};return{buildPath:function(b,c,d){var e=a(b,c,d),f=e[0],g=e[1];return d3.svg.line().x(function(a){return f(a.x)}).y(function(a){return g(a.y)})},buildAxes:function(b,c,d,e){var f=a(b,c,d)[0],g=d3.svg.axis().scale(f).orient("bottom");g(e);var h=e.find("text");h.attr("dy","10px")}}}]);