'use strict';

function FormNapper(form) {
  if (typeof form === 'string' || form instanceof String) {
    form = document.getElementById(form);
  }

  if (form instanceof HTMLFormElement) {
    this.htmlForm = form;
  } else {
    throw new TypeError('FormNapper requires an HTMLFormElement element or the id string of one.');
  }
}

FormNapper.prototype.hijack = function (onsubmit) {
  if (this.submitHandler) { return; }

  this.submitHandler = function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }

    onsubmit(event);
  };

  if (global.addEventListener != null) {
    this.htmlForm.addEventListener('submit', this.submitHandler, false);
  } else if (global.attachEvent != null) {
    this.htmlForm.attachEvent('onsubmit', this.submitHandler);
  } else {
    this.htmlForm.onsubmit = this.submitHandler;
  }
};

FormNapper.prototype.inject = function (name, value) {
  var input = this.htmlForm.querySelector('input[name="' + name + '"]');

  if (input == null) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    this.htmlForm.appendChild(input);
  }

  input.value = value;

  return input;
};

FormNapper.prototype.submit = function () {
  HTMLFormElement.prototype.submit.call(this.htmlForm);
};

FormNapper.prototype.detach = function () {
  if (!this.submitHandler) { return; }

  if (global.removeEventListener != null) {
    this.htmlForm.removeEventListener('submit', this.submitHandler, false);
  } else if (global.detachEvent != null) {
    this.htmlForm.detachEvent('onsubmit', this.submitHandler);
  } else {
    this.htmlForm.onsubmit = null;
  }

  delete this.submitHandler;
};

module.exports = FormNapper;
