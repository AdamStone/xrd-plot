"use strict";

angular.module('DataAnalysis', [
  'MainController',
  'D3Service', 'ColorService',
  'FileInputDirectives', 'GraphDirective'
])

.config([
  '$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(
      /^\s*(https?|ftp|mailto|file|data):/);
  }
]);
