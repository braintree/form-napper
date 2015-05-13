'use strict';
var Form = require('../index');

function triggerEvent(name, target) {
  target = target || global;
  var event = document.createEvent('Event');
  event.preventDefault = sinon.spy();
  event.initEvent(name, true, true);
  target.dispatchEvent(event);
  return event;
}

describe('Form', function () {
  beforeEach(function () {
    this.htmlForm = document.createElement('form');
    this.htmlForm.id = 'fakeform';
    document.body.appendChild(this.htmlForm);
    this.form = new Form('fakeform');
  });

  describe('constructor', function () {
    it('assigns this.htmlForm to the form with the supplied id', function () {
      expect(this.form.htmlForm).to.equal(this.htmlForm);
    });

    it('assigns this.htmlForm if passed an HTMLFormElement', function () {
      var form = document.createElement('form');
      var napped = new Form(form);
      expect(napped.htmlForm).to.equal(form);
    });

    it('throws errors when passed non-form elements', function () {
      var div = document.createElement('div');
      expect(function () {
        new Form(div);
      }).to.throw(TypeError);
    });

    it('throws errors when passed a non-form ID', function () {
      var div = document.createElement('div');
      div.id = 'yas';
      document.body.appendChild(div);

      expect(function () {
        new Form(div);
      }).to.throw(TypeError);
    });

    it('throws errors when passed a non-existent ID', function () {
      expect(function () {
        new Form('oh-yeah-its-the-form-napper');
      }).to.throw(TypeError);
    });
  });

  describe('hijack', function () {
    it('assigns a handler to the form', function () {
      var spy = this.sandbox.spy();
      this.sandbox.spy(this.form.htmlForm, 'addEventListener');

      this.form.hijack(spy);

      expect(this.form.htmlForm.addEventListener).to.have.been.called;
      expect(this.form.htmlForm.addEventListener).to.be.calledWith('submit');
    });

    it('prevents default on the submit event', function () {
      var spy = this.sandbox.spy();
      this.sandbox.spy(this.form.htmlForm, 'addEventListener');

      this.form.hijack(spy);
      var event = triggerEvent('submit', this.form.htmlForm);

      expect(event.preventDefault).to.have.been.called;
    });

    it('calls handler on form submit', function () {
      var spy = this.sandbox.spy();
      this.sandbox.spy(this.form.htmlForm, 'addEventListener');

      this.form.hijack(spy);
      triggerEvent('submit', this.form.htmlForm);

      expect(spy).to.have.been.called;
    });
  });

  describe('inject', function () {
    it('modifies existing input values', function () {
      var expectedInput = document.createElement('input');
      expectedInput.name = 'foo';
      expectedInput.value = 'bar';
      this.htmlForm.appendChild(expectedInput);

      this.form.inject('foo', 'baz');
      var actualInput = document.querySelector('input[name="foo"]');

      expect(actualInput.value).to.equal('baz');
    });

    it('appends hidden input for nonexistent input name', function () {
      this.form.inject('foo', 'bar');
      var input = document.querySelector('input[name="foo"]');
      expect(input).to.exist;
      expect(input.type).to.equal('hidden');
    });
  });

  describe('submit', function () {
    it('calls the original form submit', function () {
      var stub = this.sandbox.stub(this.form.htmlForm, 'submit');
      var prototypeStub = this.sandbox.stub(HTMLFormElement.prototype.submit, 'call');

      this.form.submit();

      expect(stub).not.to.have.been.called;
      expect(prototypeStub).to.have.been.called;
    });
  });
});
