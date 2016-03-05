var gulp = require('gulp'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  sass = require('gulp-ruby-sass') 
  notify = require("gulp-notify") 
  bower = require('gulp-bower');


gulp.task('js', function () {
  return browserify('./src/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('snapterest.js'))
        .pipe(gulp.dest('./build/'));
});

 // source and distribution folder
var  src = 'src/',
     dest = 'build/',
     bower_components = 'bower_components';

// Bootstrap scss source
var bootstrapSass = {
        in:  bower_components + '/bootstrap-sass/'
    };

// Bootstrap fonts source
var fonts = {
        in: [src + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    };

// Our scss source folder: .scss files
var scss = {
    in: src + 'scss/snapshot.scss',
    out: dest + 'css/',
    watch: src + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', function () {
  return sass(scss.in)
    .on('error', sass.logError)
    .pipe(gulp.dest(scss.out));
});


gulp.task('default', ['js'], function() {
  //gulp.watch(scss.watch, ['sass']);
});
