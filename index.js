'use strict';

var LibraryToExport = require('./src/sample-lib');

function create() {
  return new LibraryToExport();
}

module.exports = create;
