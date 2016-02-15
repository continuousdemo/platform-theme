#!/usr/bin/env node

'use strict';

const startTime = Date.now();

const program = require('commander');
const async = require('async');

program
  .option('-c, --clean', 'Clean directory before build')
  .parse(process.argv);

// Array of tasks
const tasks = [];

const styles = require('./tasks/styles');
const scripts = require('./tasks/scripts');
const copy = require('./tasks/copy');
const images = require('./tasks/images');

if (program.clean) {
  const clean = require('./tasks/clean.js');
  tasks.push(clean.build);
}

tasks.push(done => async.parallel([
  styles.compile,
  scripts.bundle,
  copy.build,
], done));

tasks.push(images.optimize);
tasks.push(styles.dist);
tasks.push(images.optimizeSprites);

// Run tasks
async.series(tasks, () => {
  const diff = Date.now() - startTime;
  console.log(`Build finished in ${diff}ms`);
});
