'use strict';

var gulp       = require('gulp');
var del        = require('del');

var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var useref     = require('gulp-useref');
var gulpif     = require('gulp-if');
var uglify     = require('gulp-uglify');
var minifyCss  = require('gulp-minify-css');

var jsonminify = require('gulp-jsonminify');
var flatten    = require('gulp-flatten');

var wiredep    = require('wiredep').stream;

gulp.task('default', ['sass:watch']);

gulp.task('sass', function () {
  return gulp.src(['./src/**/*.scss', '!src/bower_components/**/*.scss'])
				.pipe(sourcemaps.init())
		    .pipe(sass().on('error', sass.logError))
				.pipe(sourcemaps.write())
		    .pipe(gulp.dest('src'));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(['./src/**/*.scss', '!src/bower_components/**/*.scss'], ['sass']);
});


gulp.task('copy:manifest', function () {
	return gulp.src(['src/manifest.json'])
	.pipe(jsonminify())
	.pipe(gulp.dest('build'));
});

gulp.task('copy:_locales', function () {
	return gulp.src(['src/_locales/**/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('build/_locales/'));
});

gulp.task('copy:img', function () {
	return gulp.src(['src/BackgroundApp/img/*'])
        .pipe(gulp.dest('build/BackgroundApp/img'));
});

gulp.task('copy:audio', function () {
	return gulp.src(['src/BackgroundApp/audio/*'])
        .pipe(gulp.dest('build/BackgroundApp/audio'));
});

gulp.task('copy:tpls', function () {
	return gulp.src(['src/**/*.tpl'])
        .pipe(gulp.dest('build/'));
});

gulp.task('copy:fonts', function () {
	var fileName = '*.{woff,woff2}';
	return gulp.src([
					'src/bower_components/open-sans/fonts/+(regular|bold)/'+fileName,
					'src/bower_components/components-font-awesome/fonts/'+fileName,
				])
				.pipe(flatten({ includeParents: -1}))
				.pipe(gulp.dest('build/vendors/fonts'));
});


gulp.task('build',['sass', 'clean'], function () {
	gulp.start('build:all');
});

gulp.task('build:all', [
	'build:Background',
	'build:Options',
	'build:Popup',
	'copy:audio',
	'copy:manifest',
	'copy:_locales',
	'copy:img',
	'copy:tpls',
	'copy:fonts',
]);
gulp.task('build:Background', function () {
    return gulp.src('src/BackgroundApp/background.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build/BackgroundApp'));
});

gulp.task('build:Options', function () {
    return gulp.src('src/OptionsApp/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build/OptionsApp'));
});

gulp.task('build:Popup', function () {
    return gulp.src('src/PopupApp/popup.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build/PopupApp'));
});

gulp.task('clean', function () {
	return del(['build/*'])
});

gulp.task('bower', function () {
  gulp.src('src/**/*.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('src'));
});
