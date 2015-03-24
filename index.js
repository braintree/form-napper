'use strict';

function FormNapper(formId) {
  this.htmlForm = document.getElementById(formId);
}

FormNapper.prototype.hijack = function (onsubmit) {
  function handler(e) {
    e.preventDefault();
    onsubmit(e);
  }

  if (global.addEventListener != null) {
    this.htmlForm.addEventListener('submit', handler);
  } else if (global.attachEvent != null) {
    this.htmlForm.attachEvent('onsubmit', handler);
  } else {
    this.htmlForm.onsubmit = handler;
  }
};

FormNapper.prototype.inject = function (name, value) {
  var input;

  if (this.htmlForm[name] != null && 'value' in this.htmlForm[name]) {
    input = this.htmlForm[name];
  } else {
    input = document.createElement('input');
    this.htmlForm.appendChild(input);
  }

  input.name = name;
  input.value = value;
};

FormNapper.prototype.submit = function () {
  var form = this.htmlForm;

  if (form.submit && (typeof form.submit === 'function' || form.submit.call)) {
    form.submit();
  } else {
    setTimeout(function () {
      form.querySelector('[type="submit"]').click();
    }, 1);
  }
};

module.exports = FormNapper;
