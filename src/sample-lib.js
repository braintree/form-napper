'use strict';

function LibraryToExport() {
  this.initialize();
}

LibraryToExport.prototype.initialize = function () {
  // Ready
};

module.exports = LibraryToExport;
