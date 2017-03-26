var gulp         = require('gulp'),
    rename       = require("gulp-rename"),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS     = require('gulp-clean-css'),
    sourcemaps   = require('gulp-sourcemaps'),
    cached       = require('gulp-cached'),
    csscomb      = require('gulp-csscomb'),
		rename       = require('gulp-rename'),
    plumber      = require('gulp-plumber'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify'),
    cheerio      = require('gulp-cheerio'),
    svgmin       = require('gulp-svgmin'),
    svgSymbols   = require('gulp-svg-symbols'),
    svgSprite    = require('gulp-svg-sprite');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('svgsprite', function() {
  return gulp.src('app/img/icons/*.svg')
  .pipe(svgmin({
    plugins: [
      {"removeTitle": true},
      {"cleanupIDs": true},
      {"transformsWithOnePath": true},
      {"removeRasterImages": true},
      {"removeStyleElement": true},
      {"removeXMLNS": true},
      {"minifyStyles": true},
      {"convertPathData": true},
      {"convertTransform": true},
    ]
  }))
  .pipe(svgSymbols({
    id: 'icon-%f',
    className: '.icon-%f',
    title: false,
    svgClassname: 'svg-icon',
  }))
  .pipe(rename({
    basename: "sprite",
  }))
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('path[id]').removeAttr('id');
      $('path[class]').removeAttr('class');
      $('svg').attr('style', 'display:none');
    }
  }))
  .pipe(gulp.dest('app/img/sprites'))
  .pipe(browserSync.stream());
});

gulp.task('styles', function () {
	return gulp.src('scss/*.scss')
  .pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(
        [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 49',
          'Firefox >= 49',
          'Explorer >= 10',
          'iOS >= 9.3',
          'Opera >= 42',
          'Safari >= 9.1'
        ]
    ))
	// .pipe(cleanCSS())
  .pipe(csscomb())
  .pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
    './app/libs/swiper/swiper.min.js'
	])
	.pipe(concat('libs.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
  gulp.watch('app/img/icons/*.svg', ['svgsprite']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
