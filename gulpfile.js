const gulp = require('gulp');
const browserify = require("browserify")
const sequence = require('run-sequence')

const fs = require('fs')
const watchify = require('watchify')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')

var gif = require('gulp-if')
var babel=require('gulp-babel')
var cleacCss=require('gulp-clean-css')
var concat=require('gulp-concat')
var sass=require('gulp-sass')

var isProduction = process.env.ENV === "prod";

gulp.task('default', function() {
	// sequence('vendorjs','mainjs');
	sequence('covertJs','sass','covertCss','watch','mainjs');
});


gulp.task('covertJs', function(){
   	gulp.src('./assets/js/*.js')
    .pipe(babel({
      presets: ['env'],
      plugins: ["transform-remove-strict-mode"]
    }))
    .pipe(gulp.dest('./assets/dist/'))

})

gulp.task('covertCss', function(){
   	gulp.src('./assets/css/*.css')
   	.pipe(concat('main.css'))
    .pipe(gif(isProduction, cleacCss()))
    .pipe(gulp.dest('./css/'))

})

gulp.task('sass', function(){
   	gulp.src('./assets/css/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css/'))

})


gulp.task('watch', function(){
  gulp.watch('./assets/css/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['covertJs']);
  gulp.watch('./assets/css/*.css', ['covertCss']);
})

gulp.task('mainjs', function() {
	var b = browserify({
		entries: ['assets/dist/index.js'],
		cache: {},
		packageCache: {},
		plugin: [watchify]
	});

	function bundle() {
		b.bundle()
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(gif(isProduction, uglify()))
			.pipe(gulp.dest('./js/'));
	}



	bundle()

	b.on('update', bundle)
});


// gulp.task('vendorjs',function(){
// 	var b= browserify().require('./bower_components/angular/index.js',{
// 		expose:'angular'
// 	}).require('./bower_components/lodash/dist/lodash.js',{
// 		expose:'lodash'
// 	}).require('./bower_components/jquery/dist/jquery.js',{
// 		expose:'jquery'
// 	}).bundle().pipe(fs.createWriteStream('js/vendor.js'))
// })