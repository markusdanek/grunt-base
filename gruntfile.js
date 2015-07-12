module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    folders: {
      'dist': 'dist',
      'app': 'app'
    },

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        ignores: [
        'Grunfile.js', 
        'app/lib/**/*'
        ]
      },
      all: [
      'app/**/*.js',
      ]
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/app.min.js': 'app/js/main.js'
        }
      }
    },

    // compile less stylesheets to css -----------------------------------------
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [
        {
          expand: true,
          cwd: 'app/less',
          src: ['*.less'],
          dest: 'app/css/',
          ext: '.css'
        }
        ]
      }
    },

    // starting an express server ----------------------------------------------
    express: {
      dev: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['app'],
          livereload: true
        }
      }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less', 'cssmin'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: 'app/**/*.js',
        tasks: ['jshint', 'uglify']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'less', 'express', 'express-keepalive', 'watch:reload']);

};