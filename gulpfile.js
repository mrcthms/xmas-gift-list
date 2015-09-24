'use strict';

var path = require('path');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var loadLmnTask = require('lmn-gulp-tasks');

var buildPath = './public/';

gulp.task('auto-reload', loadLmnTask('auto-reload'));

gulp.task('js', ['js-quality'], loadLmnTask('browserify', {
  src: './src/js/react.js',
  dest: path.join(buildPath, 'js/bundle.js'),
  react: true
}));

gulp.task('js-quality', loadLmnTask('js-quality', {
  src: './src/js/**/*.js'
}));

gulp.task('scss', loadLmnTask('scss', {
  src: './src/scss/*.{sass,scss}',
  dest: path.join(buildPath, 'stylesheets'),
  imagePath: '../images'
}));

gulp.task('build', ['js', 'scss']);

gulp.task('move-html', loadLmnTask('copy', {
  src: 'index.html',
  dest: path.join(buildPath, 'index.html'),
  rev: false,
  flatten: false
}));

gulp.task('default', ['build'], function () {
  var config = {
    server: {
      baseDir: '.'
    },
    ghostMode: {
      scroll: false,
      links: false,
      forms: false
    }
  };

  if (process.argv.indexOf('--no-open') !== -1) {
    config.open = false;
  }

  browserSync.init([
    'public/**/*.css',
    'public/**/*.js',
    'public/**/*.html',
    'src/imgs/**/*',
    'test/**/*.js'
  ], config);



  gulp.watch('./src/scss/**/*.{sass,scss}', ['scss']);
  gulp.watch('./src/**/*.js{on,x,}', ['js']);
  // gulp.watch('./src/partials/partial.erb.html', ['html']);
  // gulp.watch('./demo/base.erb.html', ['html']);
  gulp.watch('./index.html', ['move-html']);
});
