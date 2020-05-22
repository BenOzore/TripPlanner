const  {src, dest, watch, series} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function js(done) {
  src('src/js/app.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest('dist/app.js'))
    done();
} 

function css(done) {
  src('src/css/style.css')
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
  done();
}

function watching() {
  watch('src/css/*.css', series(css));
  watch('src/js/*.js', series(js));
}

exports.default = series(js, css, watching);
