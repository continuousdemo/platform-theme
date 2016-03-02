'use strict';

const del = require('del');

// Clean process directories
module.exports = {
  build: (done) => {
    const startTime = Date.now();
    console.log('Clean `.tmp` and `build`: started');
    return del(['.tmp', 'build'], { dot: true }).then(() => {
      const diff = Date.now() - startTime;
      console.log(`Clean: done (${diff}ms)`);
      done();
    });
  },
};
