module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'server/conf/karma.config.js',
                autoWatch: true
            }

        },

        jshint: {},

        uglify: {
            min: {
                files: {

                },

                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        'build on <%= grunt.template.today("yyyy-mm-dd") %> */',
                    mangle: false
                }
            }
        },


        cssmin: {
            min: {
                files: {}
            }

        },

        watch: {
            files: ['client/index.jade',
                'client/**/*.js',
                'client/*.js',
                'client/**/*.jade',
                'client/**/*.html',
                'client/assets/**/**'

            ],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('karma-runner', ['karma']);
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['bowerify', 'uglify:min']);

    grunt.registerTask('bowerify', 'This will generate the list of files to minify', function() {
        var bowerrcPath = grunt.file.readJSON('.bowerrc')['directory'];

        var $dep = grunt.file.readJSON('bower.json').dependencies;
        var compArr = [];
        var minificationFiles = {};
        for (var k in $dep) {
            var arr = {
                name: '',
                version: '',
                baseUrl: '',
                minifiedUrl: ''
            };
            arr.name = k;
            arr.version = $dep[k];
            arr.baseUrl = bowerrcPath + "/" + k + "/" + k + ".js";
            arr.minifiedUrl = 'client/assets/lib/js/' + k + "/" + k + ".min.js";
            minificationFiles[arr.minifiedUrl] = arr.baseUrl;
            compArr.push(arr);
        }

        grunt.config("uglify.min.files", minificationFiles);
    });



    grunt.registerTask('learn', 'this is test', function() {
        var schemasObs = require('./server/schemas');
        var preciseSchemaObs = {};
        for (var ob in schemasObs) {
            preciseSchemaObs[ob] = schemasObs[ob]['paths'];
        }
        deepLearnObject(preciseSchemaObs);
        grunt.file.write("./server/schemas/SchemaTable.json",
            JSON.stringify(preciseSchemaObs));
    });

};


function deepLearnObject(object) {
    var _delObj = ['regExp',
        'getters',
        'setters',
        '_index',
        'options'
    ];


    if (typeof(object) === 'object') {
        for (var obj in object) {
            if (object.hasOwnProperty(obj)) {
                if (typeof(object[obj]) === 'object') {
                    for (var index in _delObj) {
                        if (object[obj] !== null && object[obj].hasOwnProperty(_delObj[index])) {
                            delete object[obj][_delObj[index]];
                        }
                    }
                    deepLearnObject(object[obj]);
                }
            }
        }
    } else {
        console.log("object is not defined!");
    }

}
