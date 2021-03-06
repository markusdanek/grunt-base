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
        'app/assets/js/app.min.js',
        'app/assets/js/respond.min.js',
        'app/assets/js/html5shiv.min.js',
        'app/assets/lib/**/*'
        ]
      },
      all: [
      'app/**/**/*.js',
      ]
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'app/assets/js/app.min.js': 'app/assets/js/app.js'
        }
      }
    },

    // compile sass stylesheets to css -----------------------------------------
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/assets/css/main.css': 'app/assets/sass/main.sass'
        }
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
      sass: {
        files: ['**/*.{scss,sass}'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      reload: {
        options: {
          livereload: true
        },
        files: ['app/**/*'],
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['jshint', 'sass', 'express', 'watch']);

};
