/*eslint-env node */
'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var del = require('del');

var cssDestination = 'dist/css';

gulp.task('clean:css', function(cb){
  del([cssDestination + '/typekwondo.css'], cb);
});

gulp.task('less', function(){
  gulp.src('src/css/typekwondo.less')
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(gulp.dest(cssDestination));
});


gulp.task('css', ['clean:css', 'less']);