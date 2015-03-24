'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  gulp.src([ 'index.hs' ])
  .pipe(eslint())
  .pipe(eslint.format());
});
