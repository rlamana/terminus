({
    baseUrl: 'src',
    name: '../vendor/almond',
    include: ['terminus'],

    out: 'build/terminus.js',
   	
   	wrap: {
        start: "(function(exports) {",
        end: "exports.Terminus = require('terminus');\n})(window);"
    },

    optimize: 'uglify'
})