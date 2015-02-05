angular.module('DataAnalysis', [
  'MainController',
  'D3Service',
  'FileInputDirectives', 'GraphDirective'
])

.config([
  '$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
  }
])