module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browserify')

  grunt.registerTask('default', 'watch')

  grunt.initConfig({
    //
    browserify: {
      main: {
        src: 'src/main.js',
        dest: 'bundle.js',
        files: {
          'bundle.js': ['./src/*.js', './src/**/*.js' ],
        },
        options: {
          transform: ['brfs'],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },

    //
    watch: {
      everything: {
        files: ['./src/*.js', './src/**/*.js' ],
        tasks: ['browserify:main'],
        options: {
          livereload: {
            port: 35729
          }
        },
      },
    }

  })

}
