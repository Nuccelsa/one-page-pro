var gulp = require('gulp');

// Variables des plugins
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// Tous les plugins de package.json
var plugins = require('gulp-load-plugins')();

var source = './src';
var dest = './dist';

// jQuery
gulp.task('vendor', function() {
    gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))
});

// Compilation scss en css
gulp.task('css:compile', function () {
    return gulp.src(source + '/scss/**/*.scss')
    .pipe(sass.sync({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(dest + '/css/'));
});

// Minification css
gulp.task('css:min', ['css:compile'], function () {
    return gulp.src([
      dest + '/css/*.css',
      !dest + '/css/*.min.css'
    ])
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(dest + '/css'))
      .pipe(browserSync.stream());
});

// Tâche CSS
gulp.task('css', ['css:compile', 'css:min']);

// Minification JS
gulp.task('js:min', function() {
  return gulp.src([
    source + '/js/*.js',
    !source + '/js/*.min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dest + '/js'))
    .pipe(browserSync.stream());
});

// Tâche JS
gulp.task('js', ['js:min']);

// Tâche images
gulp.task('img', function () {
  return gulp.src(source + '/img/**')
  .pipe(gulp.dest(dest + '/img'));
});

/* Tâche de build : compilation + copie dans dist */
gulp.task('build', ['css:compile', 'img']);

// Tâche de prod = minification CSS et JS + copie
gulp.task('prod', ['css', 'js', 'img']);

// Config browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Commande "dev" pour pouvoir bosser en local
gulp.task('dev', ['build', 'browserSync'], function() {
  gulp.watch(source + '/scss/**/*.scss', ['css']);
  gulp.watch(source + '/js/*.js', ['js']);
  gulp.watch(source + '/img', ['img']);
  gulp.watch('./*.html', browserSync.reload);
}); 

