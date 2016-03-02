'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const rollup = require('rollup').rollup;
const path = require('path');
const fs = require('fs');
const babel = require('rollup-plugin-babel');
const glob = require('glob');
const async = require('async');

// Helpers
function isFile(file) {
  try {
    const stats = fs.statSync(file);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}

function resolver(importee, importer) {
  const resolvedFile = `${importee.replace(/\.js$/, '')}.js`;

  if (isFile(path.resolve(resolvedFile))) {
    // Absolute
    return path.resolve(resolvedFile);
  } else if (isFile(path.resolve(path.dirname(importer), resolvedFile))) {
    // Relative to importer
    return path.resolve(path.dirname(importer), resolvedFile);
  } else if (isFile(path.resolve(__dirname, '../../bower_components', resolvedFile))) {
    // Relative to bower_components
    return path.resolve(__dirname, '../../bower_components', resolvedFile);
  }

  if (path.basename(resolvedFile) !== 'index.js') {
    return resolver(path.join(importee, 'index.js'), importer);
  }

  throw new Error(`File ${importee} not found`);
}

function bundleES6(file, done) {
  const relativePath = path.relative('./src/scripts', file);
  return rollup({
    entry: path.resolve('src/scripts', relativePath),
    plugins: [
      { resolveId: resolver },
      babel({ presets: ['es2015-rollup'] }),
    ],
  }).then((bundle) => bundle.write({
    dest: path.resolve('build/scripts', relativePath),
    sourceMap: true,
    format: 'iife',
    indent: true,
  })).then(() => done());
}

// Concatenate and minify JavaScript. Transpiles ES2015 code to ES5.
// See https://babeljs.io/docs/usage/options/ for more informations on Babel options
// Note: "comments: false" is very heavy
function scriptsBundle(done) {
  const startTime = Date.now();
  console.log('Bundle JS (framework): started');

  const files = glob.sync('./src/scripts/*/**/*.js');
  files.push('./src/scripts/theme.js');

  async.each(files, bundleES6, () => {
    const diff = Date.now() - startTime;
    console.log(`Bundle JS (framework): done (${diff}ms)`);
    done();
  });
}

function scriptsBundleVendors(done) {
  const startTime = Date.now();
  console.log('Bundle JS (vendors): started');

  return rollup({
    entry: './src/scripts/vendors.js',
    plugins: [{ resolveId: resolver }],
  }).then((bundle) => bundle.write({
    dest: 'build/scripts/vendors.js',
    sourceMap: true,
    format: 'es6',
  }).then(() => {
    const diff = Date.now() - startTime;
    console.log(`Bundle JS (vendors): done (${diff}ms)`);
    done();
  })
  );
}

function uglify(done) {
  const startTime = Date.now();
  console.log('Uglify JS: started');

  gulp.src(['./build/scripts/**/*.js'])
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.', { includeContent: true, sourceRoot: '../src/' }))
    .pipe(gulp.dest('build/scripts'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Uglify JS: done (${diff}ms)`);
      done();
    });
}

module.exports = {
  bundle: scriptsBundle,
  bundleVendors: scriptsBundleVendors,
  uglify,
};
