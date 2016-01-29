var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var $ = require('gulp-load-plugins')();
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
// var babelify = require('babelify');
var uglify = require('gulp-uglify');

gulp.task('jsx', function(){
    var b = browserify({
      entries: './client/client.js',
      debug: true,
      external: [],
      standalone: 'POP',
      cache: {},
     // defining transforms here will avoid crashing your stream
   });

    b.transform(reactify);
    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe($.uglify())
      // .pipe($.rename({suffix: '.min'}))
      .pipe(gulp.dest('./public/build/'));
});
