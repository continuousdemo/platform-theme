'use strict';

const async = require('async');
const gulp = require('gulp');
const glob = require('glob');

const filesToCopy = [
  {
    src: './src/images/**/*.{jpg,jpeg,png,gif,svg}',
    dest: './build/images/'
  }, {
    src: './src/templates/**',
    dest: './build/templates/'
  }, {
    src: './src/*.*',
    dest: './build/'
  }, {
    src: './bower_components/bootstrap-sass/assets/fonts/bootstrap/**',
    dest: './build/fonts/bootstrap'
  }
];

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

    // Automatically import every assets from the framework
    const sources = [];
    [
      './bower_components/ne-theme-framework-dev/src/framework/elements/*',
      './bower_components/ne-theme-framework-dev/src/framework/components/*',
      './bower_components/ne-theme-framework-dev/src/framework/base/*',
      './bower_components/ne-theme-framework-dev/src/framework/layouts/*'
    ].forEach(folder => {
      glob.sync(folder).forEach(component => {
        sources.push(`${component}/{images,fonts}/**`);
      });
    });
    filesToCopy.push({ src: sources, dest: 'build' });

    return extractTasks(filesToCopy, res => {
      const diff = Date.now() - startTime;
      console.log(`Copy 'build': done (${diff}ms)`);
      return done(res);
    });
  }
};
