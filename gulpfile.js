'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'), // Bundles JS
    minifyCss = require('gulp-minify-css'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    source = require('vinyl-source-stream'), // Use conventional text streams with Gulp
    lint = require('gulp-eslint'),   //Lint JS files, including JSX
    sourcemaps = require('gulp-sourcemaps'),
    LiveServer = require('gulp-live-server'),
    browserSync = require('browser-sync'),    
    babel = require('babelify'),
    factor = require('factor-bundle');




var paths = {
    SRC: './app',
    HTML: './app/page/admin_page*.html',
    JS: ['./app/**/**/*.js'],
    IMAGES: '/app/static/images/**/*',
    CSS: ['./app/**/css/*.css'],
    MAIN_JS_ENTRIES: [ './app/static/scripts/admin-ui.js'],
    MAIN_JS_OUTPUTS: [ './dist/static/scripts/admin-ui.js'],
    DIST: './dist'
};



gulp.task('html', function() {
    gulp.src(paths.HTML)
    .pipe(flatten())
    .pipe(gulp.dest(paths.DIST + '/templates'))
    .pipe(browserSync.stream());
});


gulp.task('css', function() {
    return gulp.src('app/static/css/admin-ui.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.DIST + '/static/css'))
    .pipe(browserSync.stream());
});



gulp.task('js', function(done) {
    return browserify({
    entries: paths.MAIN_JS_ENTRIES,
    debug: true
    })
    // .transform('babelify', { presets: ['es2015', 'react'], sourceMaps: true })
    .plugin(factor, {
        outputs: paths.MAIN_JS_OUTPUTS
    })
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('admin-ui.js'))
    .pipe(gulp.dest('./dist/static/scripts/'));
});


// reload browserSync
gulp.task('js-watch', ['js'], browserSync.reload);


gulp.task('images', function () {
    gulp.src(paths.IMAGES)
    .pipe(gulp.dest(paths.DIST + '/static/images'));
});


gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
})

gulp.task('watch', function() {
    gulp.watch(paths.HTML, ['html']);
    gulp.watch(paths.CSS, ['css']);
    gulp.watch(paths.JS, ['js-watch', 'lint']);
    gulp.watch(paths.IMAGES, ['images']);
});


gulp.task('live-server', ['html', 'js', 'css', 'images', 'watch'], function() {
    var server = new LiveServer('./server');
    server.start();
});


gulp.task('serve', ['live-server'], function() {
    browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: 9001
    });
});


gulp.task('default', ['serve']);
