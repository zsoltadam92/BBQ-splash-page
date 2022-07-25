const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

//SCSS Task
function scssTask() {
  return src('app/scss/style.scss', {sourcemaps: true})
  .pipe(sass({debugInfo   : true,}))
  .pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(dest('dist', {sourcemaps: '.'}))
}

// optimize and moves images
function optimizeimage() {
  return src('app/images/*.{jpg,png}')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(dest('dist/images'))
}

// optimize and moves images
function webpImage() {
  return src('app/images/*.{jpg,png}')
  .pipe(imagewebp())
  .pipe(dest('dist/images'))
}

//JS Task
function jsTask() {
  return src('app/js/script.js', {sourcemaps: true})
  .pipe(babel({presets: ['@babel/preset-env']}))
  .pipe(terser())
  .pipe(dest('dist', {sourcemaps: '.'}))
}

//BrowserSync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  }),
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

//watchTask
function watchTask() {
  watch('*.html',browserSyncReload);
  watch(
    ['app/scss/**/*.scss', 'app/js/**/*.js'],
    series(scssTask,jsTask,browserSyncReload)
  );
  watch('app/images/*',optimizeimage);
  watch('dist/images/*.{jpg,png}', webpImage);
}

//Default Gulp Task
exports.default = series(scssTask,optimizeimage,webpImage,jsTask,browserSyncServe,watchTask);