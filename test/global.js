'use strict';

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
  document.body.innerHTML = '';
});

afterEach(function () {
  this.sandbox.restore();
});
