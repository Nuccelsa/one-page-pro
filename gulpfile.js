var gulp = require('gulp');

// Variables des plugins
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// Tous les plugins de package.json
var plugins = require('gulp-load-plugins')(); 


// jQuery
gulp.task('vendor', function() {
    gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))
})

// Compilation scss en css
gulp.task('css:compile', function () {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass.sync({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest('./dist/css/'));
  });

// Minification css
gulp.task('css:min', ['css:compile'], function () {
    return gulp.src([
      './dist/css/*.css',
      '!./dist/css/*.min.css'
    ])
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
  });

// Tâche CSS
gulp.task('css', ['css:compile', 'css:min']);

// Minification JS
gulp.task('js:min', function() {
    return gulp.src([
      './src/js/*.js',
      '!./src/js/*.min.js'
    ])
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.stream());
  });

// Tâche JS
gulp.task('js', ['js:min']);

// Tâche de prod = Compile CSS + minification CSS et JS
gulp.task('prod', ['css', 'js']);

// Config browserSync
gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
  });

// Commande "gulp" : fait TOUT pour pouvoir bosser en local
gulp.task('default', ['prod', 'browserSync', 'vendor'], function() {
    gulp.watch('./src/scss/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./*.html', browserSync.reload);
  });
