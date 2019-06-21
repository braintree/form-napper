'use strict';

beforeEach(function () {
  this.sandbox = sinon.createSandbox();
  document.body.innerHTML = '';
});

afterEach(function () {
  this.sandbox.restore();
});
