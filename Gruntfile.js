(function() {
    'use strict';

    module.exports = function(grunt) {

        var DEV_PATH = '../dev_bujuse';

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            clean: {
                options: {
                    force: true
                },
                dev: {
                    src: [DEV_PATH]
                }
            },

            // configure nodemon
            nodemon: {
                dev: {
                    script: 'server.js'
                }
            },

            watch: {
                dev: {
                    files: [
                        'public/**/*'
                    ],
                    tasks: ['copy:dev'],
                    options: {
                        atBegin: true
                    }
                }
            },

            copy: {
                dev: {
                    files: [{
                        expand: true,
                        src: [
                            'app/**/*',
                            'config/**/*',
                            'public/**/*',
                            'server.js',
                        ],
                        dest: DEV_PATH
                    }]
                }
            },

            concurrent: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['nodemon', 'watch']
            },

            jshint: {
                dev: {
                    src: ['public/**/*']
                },
            },

        });

        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-nodemon');
        grunt.loadNpmTasks('grunt-concurrent');
        grunt.loadNpmTasks('grunt-contrib-jshint');

        grunt.registerTask('default', ['clean', 'concurrent']);

    };

})();
