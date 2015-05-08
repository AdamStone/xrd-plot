var Path = require('path');

console.log(Path.resolve('./backend/server.js'));

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      angular: {
        src: 'frontend/src/angular/**/*.js',
        dest: 'frontend/public/app.js'
      }
    },

    sass: {
      build: {
        src: 'frontend/src/sass/styles.scss',
        dest: 'frontend/public/styles.css'
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: [{
          expand: true,
          src: ['**/*.jade'],
          dest: 'frontend/public',
          ext: '.html',
          cwd: 'frontend/src',
          flatten: true
        }]
      }
    },

    hapi: {
      custom_options: {
        options: {
          server: Path.resolve('./backend/server'),
          bases: {
            '/': Path.resolve('./frontend/public/')
          }
        }
      }
    },

    watch: {

      js: {
        files: ['frontend/src/angular/**/*.js'],
        tasks: ['uglify']
      },

      sass: {
        files: 'frontend/src/**/*.scss',
        tasks: 'sass',
        options: {
          livereload: false
        }
      },

      jade: {
        files: ['frontend/src/**/*.jade'],
        tasks: 'jade'
      },

      hapi: {
        files: ['backend/**/*'],
        tasks: ['hapi'],
        options: {
          spawn: false
        }
      },

      public: {
        files: ['frontend/public/**/*.*'],
        options: {
          livereload: true
        }
      }

    }

  });

  var contribs = [
    'watch',
    'uglify',
    'jade',
    'copy'
  ];

  grunt.loadNpmTasks('grunt-hapi');
  grunt.loadNpmTasks('grunt-sass');

  for (var i=0; i < contribs.length; i++) {
    grunt.loadNpmTasks('grunt-contrib-' + contribs[i]);
  };

  grunt.registerTask('default', [
    'sass',
    'jade',
    'uglify'
  ]);

  grunt.registerTask('serve', [
    'default',
    'hapi',
    'watch'
  ]);

};
