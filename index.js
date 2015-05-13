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
  function handler(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }

    onsubmit(event);
  }

  if (global.addEventListener != null) {
    this.htmlForm.addEventListener('submit', handler, false);
  } else if (global.attachEvent != null) {
    this.htmlForm.attachEvent('onsubmit', handler);
  } else {
    this.htmlForm.onsubmit = handler;
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
};

FormNapper.prototype.submit = function () {
  HTMLFormElement.prototype.submit.call(this.htmlForm);
};

module.exports = FormNapper;
