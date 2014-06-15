/*global module:false, require:false */
/**!
 * Gruntfile
 * Follow README.md to get started
 */
module.exports = function(grunt) {

    /**
     * Load all grunt tasks.
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Displays the elapsed execution time of grunt tasks
     */
    require('time-grunt')(grunt);

    /**
     * Project configuration
     */
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n * <%= pkg.description %> - <%= pkg.author %> - Build <%= pkg.version %> \n */\n',

        jshint: {
            files: [
                'Gruntfile.js',
                'cardtype.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        jscs: {
            src: [ '<%= jshint.files %>' ],
            options: {
                config: ".jscs.json"
            }
        },

        uglify: {
            build: {
                files: {
                    'cardtype.min.js': [ 'cardtype.js' ]
                }
            }
        },

        copy: {
            demo: {
                src: 'cardtype.js',
                dest: 'demo/js/cardtype.js',
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
            }
        },

        watch: {
            lint: {
                files: ['<%= jshint.files %>'],
                tasks: [ 'build' ]
            }
        }

    });

    /**
     * Register tasks
     */
    grunt.registerTask('build', [
        'jscs',
        'jshint',
        'karma:unit',
        'uglify',
        'copy'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);

};
