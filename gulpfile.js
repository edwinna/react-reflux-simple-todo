var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
// var babelify = require('babelify');
var paths = {
//   scripts: 'app/scripts/**/*.js',
  css: 'app/styles/*.sass'
};
gulp.task('jsx', function(){
    var b = browserify({
      entries: './app/scripts/client.js',
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


gulp.task('sass', function(){
    gulp.src('./app/styles/*.scss')
        .pipe($.sass())
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.minifyCss())
        .pipe(gulp.dest('./public/stylesheets/'))
})

gulp.task('watchfiles', function(){
    gulp.watch(paths.scripts, ['jsx']);
    gulp.watch(paths.css, ['sass']);
})
gulp.task('default',['jsx','sass']);
