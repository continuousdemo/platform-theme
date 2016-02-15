'use strict';

const async = require('async');
const gulp = require('gulp');

const filesToCopy = [{
  src: './src/images/**/*.{jpg,jpeg,png,gif,svg}',
  dest: './build/images/',
}, {
  src: './src/templates/**',
  dest: './build/templates/',
}, {
  src: './src/*.*',
  dest: './build/',
}];

function copy(file, done) {
  return gulp.src(file.src, { dot: true })
    .pipe(gulp.dest(file.dest))
    .on('end', done);
}

function extractTasks(mappings, done) {
  return async.each(mappings, copy, done);
}

module.exports = {
  build: done => {
    const startTime = Date.now();
    console.log('Copy `build`: started');

    return extractTasks(filesToCopy, res => {
      const diff = Date.now() - startTime;
      console.log(`Copy 'build': done (${diff}ms)`);
      return done(res);
    });
  },
};
