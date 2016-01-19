var gulp = require('gulp');
var gutil = require('gulp-util');

var runSequence = require('run-sequence');

var del = require('del');

var Promise = require('bluebird');
var webpack = require('webpack');

// Default task, dev build
gulp.task('default', function(callback) {
	runSequence(
		['build-clean'],
		['move-html', 'move-css', 'move-audio', 'move-lib', 'build-scripts'],
		callback
	);
});

gulp.task('production-build', function(callback) {
	runSequence(
		['build-clean'],
		['move-html', 'move-css', 'move-audio', 'move-lib', 'build-scripts-production'],
		callback
	);
});

// Clears the distribution folder before running the other tasks
gulp.task('build-clean', function() {
	 return del(['./dist']);
});

gulp.task('move-html', function() {
	gulp.src(['./src/index.html'])
		.pipe(gulp.dest('./dist'));
});

gulp.task('move-css', function() {
	gulp.src(['./src/styles/style.css'])
		.pipe(gulp.dest('./dist/styles'));
});

gulp.task('move-audio', function() {
	gulp.src(['./src/audio/*.aac', './src/audio/*.ogg', './src/audio/*.opus'])
		.pipe(gulp.dest('./dist/audio'));
});

gulp.task('move-lib', function() {
	gulp.src(['./src/scripts/howler.min.js', './src/scripts/written-number.min.js'])
		.pipe(gulp.dest('./dist/scripts'));
});

function build(config) {
	return Promise.promisify(webpack)(config)
	.catch(function(err) {
		if(err) {
			throw new gutil.PluginError('webpack', err);
		}
	});
}

gulp.task('build-scripts', function() {
	var webpackConfig = require('./webpack.config.js');

	build(webpackConfig);
});

gulp.task('build-scripts-production', function() {
	var webpackConfig = require('./webpack.config.js');
	webpackConfig.plugins = [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin()
	];

	build(webpackConfig);
});
