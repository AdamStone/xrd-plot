var Hapi = require('hapi'),
    Path = require('path');

var server = new Hapi.Server('localhost', 3000, {
  files: { relativeTo: Path.join(__dirname, '..', 'frontend')}
});

module.exports = server;