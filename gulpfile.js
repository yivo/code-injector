var gulp = require('gulp');
var extensions = {
    minifycss : 'gulp-minify-css',
    uglify : 'gulp-uglify',
    clean : 'gulp-clean',
    concat : 'gulp-concat',
    rename : 'gulp-rename',
    preprocess : 'gulp-preprocess',
    minifyhtml : 'gulp-minify-html'
};

var e = function() {
    var cache = {};
    return function(ext) {
        return cache[ext] || (cache[ext] = require(extensions[ext]));
    };
}();

var srcpath = 'src/';
var buildpath = 'build/';
var jspublic = buildpath + 'js/';
var jssrc = srcpath + 'js/';
var jsvendor = 'bower_components/';
var csspublic = buildpath + 'css/';
var csssrc = srcpath + 'css/';
var cssvendor = 'bower_components/';

var jsscripts = {
    app : [
        'namespaces.js',
        'entities/model.js',
        'entities/rule.js',
        'views/base.js',
        '**/*.js'
    ].map(function(path) { return jssrc + path; }),
    vendor : [
        'jquery/dist/jquery.js',
        'jquery-ui/ui/core.js',
        'jquery-ui/ui/widget.js',
        'jquery-ui/ui/mouse.js',
        'jquery-ui/ui/sortable.js',
        'underscore/underscore.js',
        'backbone/backbone.js'
    ].map(function(path) { return jsvendor + path; })
};
jsscripts.all = jsscripts.vendor.concat(jsscripts.app);

var cssscripts = {
    app : [csssrc + 'styles.css'],
    vendor : [
        'pure/pure.css',
        'jquery-ui/themes/base/core.css',
        'jquery-ui/themes/base/sortable.css'
    ].map(function(path) { return cssvendor + path; })
};
cssscripts.all = cssscripts.vendor.concat(cssscripts.app);

gulp.task('build-dev', function() {
    process.env.NODE_ENV = 'development';
    return gulp.start('build');
});

gulp.task('build-release', function() {
    process.env.NODE_ENV = 'production';
    return gulp.start('build');
});

gulp.task('build', function() {
    return gulp.start('html', 'js', 'css', 'bg-scripts', 'content-scripts', 'ext-configs', 'images');
});

gulp.task('js', function() {
    var js = gulp.src(jsscripts.all)
        .pipe(e('concat')('app.js'));
    if (process.env.NODE_ENV === 'production') {
        js.pipe(e('uglify')());
    }
    return js.pipe(gulp.dest(jspublic));
});

gulp.task('css', function() {
    var css = gulp.src(cssscripts.all)
        .pipe(e('concat')('app.css'));
    if (process.env.NODE_ENV === 'production') {
        css.pipe(e('minifycss')({ keepSpecialComments : 0 }));
    }
    return css.pipe(gulp.dest(csspublic));
});

gulp.task('html', function() {
    var opts = { comments : false, spare : false, empty : false};
    var html = gulp.src(srcpath + 'options.html')
        .pipe(e('preprocess')());
    if (process.env.NODE_ENV === 'production') {
        html.pipe(e('minifyhtml')(opts));
    }
    return html.pipe(gulp.dest(buildpath));
});

gulp.task('bg-scripts', function() {
    var bg = gulp.src(srcpath + 'background.js');
    if (process.env.NODE_ENV === 'production') {
        bg.pipe(e('uglify')());
    }
    return bg.pipe(gulp.dest(buildpath));
});

gulp.task('content-scripts', function() {
    var cs = gulp.src(srcpath + 'injector.js');
    if (process.env.NODE_ENV === 'production') {
        cs.pipe(e('uglify')());
    }
    return cs.pipe(gulp.dest(buildpath));
});

gulp.task('ext-configs', function() {
    return gulp.src(srcpath + 'manifest.json')
        .pipe(gulp.dest(buildpath));
});

gulp.task('images', function() {
    return gulp.src(srcpath + 'images/**/*')
        .pipe(gulp.dest(buildpath + 'images/'));
});

gulp.task('default', function() {
    return gulp.start('build');
});