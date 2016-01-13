var dotenv       = require('dotenv').load();
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var browserify   = require('gulp-browserify');
var coffee       = require('gulp-coffee');
var less         = require('gulp-less');
var minifyCSS    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var nodemon      = require('gulp-nodemon');
var replace      = require('gulp-replace');
var git          = require('git-rev');



if (process.env.MINIFY == 'true') {
    minify = true;
} else {
    minify = false;
}



gulp.task('stylesheets', function () {
    gulp.src('app/stylesheets/*.less')
        .pipe(less().on('error', gutil.log))
        .pipe(concat('claudialoutfi.css'))
        .pipe((minify == true) ? minifyCSS({ keepSpecialComments : 0 }) : gutil.noop())
        .pipe(gulp.dest('public/css'));
});



gulp.task('browserify-vendors', function() {
    gulp.src('app/vendors.js', { read: false })
        .pipe(browserify({
            shim: {
                'jquery': {
                    path: 'bower_components/jquery/dist/jquery.js',
                    exports: '$'
                },
                'jquery.backstretch': {
                    path: 'bower_components/backstretch/jquery.backstretch.js',
                    exports: null
                },
                'modernizr': {
                    path: 'bower_components/modernizr/modernizr.js',
                    exports: null
                },
                'bootstrap': {
                    path: 'bower_components/bootstrap/dist/js/bootstrap.js',
                    exports: null
                }
            },
            insertGlobals : false
        }).on('error', gutil.log))
        .pipe((minify == true) ? uglify() : gutil.noop())
        .pipe(gulp.dest('public/js'))
    gulp.src('bower_components/bootstrap/dist/fonts/*') 
        .pipe(gulp.dest('public/fonts')); 
});



gulp.task('browserify-claudialoutfi', function() {
    gulp.src('app/claudialoutfi.coffee', { read: false })
        .pipe(browserify({
            transform: ['coffeeify'],
            extensions: ['.coffee'],
            insertGlobals : false
        }).on('error', gutil.log))
        .pipe((minify == true) ? uglify() : gutil.noop())
        .pipe(rename('claudialoutfi.js'))
        .pipe(gulp.dest('public/js'))
});



gulp.task('replace-variables', function(){
    git.short(function(str){
        gulp.src('public/index.html')
            .pipe(replace(/UA\-[0-9]+\-[0-9]+/g, process.env.GA_TRACKING_CODE))
            .pipe(replace(/\?[a-f0-9]{7}\"/g, '?' + str + '"'))
            .pipe(gulp.dest('public'));
    });
});



gulp.task('compile', ['stylesheets', 'browserify-vendors', 'browserify-claudialoutfi', 'replace-variables']);



gulp.task('watch', ['stylesheets', 'browserify-vendors', 'browserify-claudialoutfi'], function() {
    gulp.watch('app/stylesheets/**/*.less', ['stylesheets']);
    gulp.watch('app/**/*.coffee', ['browserify-claudialoutfi']);
});



gulp.task('server', function() {
    nodemon({ script: 'server.coffee', options: '--watch server.coffee' });
});



gulp.task('default', ['server']);
