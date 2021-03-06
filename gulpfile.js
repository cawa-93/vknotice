'use strict';
// var debug = require('gulp-debug');

var gulp = require('gulp');

gulp.task('pot', function () {
	var gettext = require('gulp-angular-gettext');
	return gulp.src(['src/**/*.html', 'src/**/*.tpl', 'src/**/*.js', '!src/bower_components/**/*'])
			.pipe(gettext.extract('all.pot', {
				extensions: {
					htm:   'html',
					html:  'html',
					php:   'html',
					phtml: 'html',
					tml:   'html',
					ejs:   'html',
					erb:   'html',
					js:    'js',
					tag:   'html',
					jsp:   'html',
					tpl:   'html',
				}
			}))
			.pipe(gulp.dest('po/'));
});

gulp.task('translations', function () {
	var gettext = require('gulp-angular-gettext');
	var inject  = require('gulp-inject');

	var gettext = gulp.src(['po/**/*.po'])
		.pipe(gettext.compile({
			defaultLanguage: 'ru_RU',
		}))
		.pipe(gulp.dest('src/Translations'));

		return gulp.src(['src/*/*.html'])
			.pipe(inject(gettext, {relative: true}))
			.pipe(gulp.dest('src'));
});


gulp.task('default', ['sass:watch']);

gulp.task('sass', function () {
	var sass			 = require('gulp-sass');
	var sourcemaps = require('gulp-sourcemaps');

	return gulp.src(['./src/**/*.scss', '!src/bower_components/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src'));
});

gulp.task('sass:watch', ['sass'], function () {
	gulp.watch(['./src/**/*.scss', '!src/bower_components/**/*.scss'], ['sass']);
});


gulp.task('copy', ['clean'], function () {
	var jsonminify = require('gulp-jsonminify');
	var filter		 = require('gulp-filter');


	gulp.src(['src/bower_components/roboto-font/fonts/*.woff2', 'src/bower_components/components-font-awesome/fonts/*.woff2'])
			.pipe(gulp.dest('build/vendors/fonts'));

	var json = filter(['**/*.json'], {restore: true});
	return gulp.src(['src/*.json', 'src/+(_locales)/**/*.json', 'src/+(BackgroundApp)/+(audio|img)/*', 'src/**/*.tpl'])
			.pipe(json).pipe(jsonminify()).pipe(json.restore)
			.pipe(gulp.dest('build'))
});

gulp.task('zip', ['build'], function () {
	const zip = require('gulp-zip');
	return gulp.src('build/**')
        .pipe(zip('laters-build.zip'))
        .pipe(gulp.dest('build'));
});


gulp.task('build', ['copy', 'sass', 'translations'], function () {
	var useref   = require('gulp-useref');
	var uglify   = require('gulp-uglify');
	var cleanCSS = require('gulp-clean-css');
	var filter   = require('gulp-filter');
	var replace  = require('gulp-replace');

	var js = filter(['**/*.js'], {restore: true});
	var css = filter(['**/*.css'], {restore: true});
	return gulp.src(['src/+(OptionsApp|BackgroundApp|PopupApp)/*.html'])
		.pipe(useref())
		.pipe(js)
			.pipe(replace('UA-71609511-3', 'UA-71609511-2', {skipBinary: true}))
			.pipe(replace('gettextCatalog.debug = true', 'gettextCatalog.debug = false', {skipBinary: true}))
			.pipe(uglify())
		.pipe(js.restore)
		.pipe(css).pipe(cleanCSS()).pipe(css.restore)
		.pipe(gulp.dest('build'))
		;
});

gulp.task('clean', function () {
	var del	= require('del');
	return del(['build/*']);
});

gulp.task('bower', function () {
	var wiredep		= require('wiredep').stream;

	return gulp.src('src/**/*.html')
		.pipe(wiredep({
			overrides: {
					"linkifyjs": {
							"main": ['linkify.js', 'linkify-string.js'],
							"dependencies": {}
					}
			}
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('bump', function () {
	var bump = require('gulp-bump');
	var args = require('yargs').argv;
	var filter = require('gulp-filter');

	// Version example
	//	major: 1.0.0
	//	minor: 0.1.0
	//	patch: 0.0.2
	//	prerelease: 0.0.1-2
	var bumpParams = {};
	if (args.ver) bumpParams.version = args.ver;
	else bumpParams.type = args.type || 'patch';

	var manifestFilter = filter(['src/manifest.json'], {restore: true});
	var regularJsons = filter(['*.json'], {restore: true});

	return gulp.src(['bower.json', 'package.json', 'src/manifest.json'])
		.pipe(bump(bumpParams))
		.pipe(manifestFilter)
		.pipe(gulp.dest('./src'))
		.pipe(manifestFilter.restore)
		.pipe(regularJsons)
		.pipe(gulp.dest('./'));
});
