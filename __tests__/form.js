/* eslint-disable no-new */

const Form = require('../index');

function triggerEvent(name, target) {
  let event;

  target = target || global;
  event = document.createEvent('Event');

  event.preventDefault = jest.fn();
  event.initEvent(name, true, true);
  target.dispatchEvent(event);

  return event;
}

describe('Form', () => {
  let testContext, form;

  beforeEach(() => {
    document.body.innerHTML = '';

    testContext = {};
    testContext.htmlForm = document.createElement('form');
    testContext.htmlForm.id = 'fakeform';
    document.body.appendChild(testContext.htmlForm);

    form = new Form('fakeform');
  });

  describe('constructor', () => {
    it('assigns htmlForm to the form with the supplied id', () => {
      expect(form.htmlForm).toBe(testContext.htmlForm);
    });

    it('assigns htmlForm if passed an HTMLFormElement', () => {
      const htmlForm = document.createElement('form');
      const napped = new Form(htmlForm);

      expect(napped.htmlForm).toBe(htmlForm);
    });

    it('throws errors when passed non-form elements', () => {
      const div = document.createElement('div');

      expect(function () {
        new Form(div);
      }).toThrowError(TypeError);
    });

    it('throws errors when passed a non-form ID', () => {
      const div = document.createElement('div');

      div.id = 'yas';
      document.body.appendChild(div);

      expect(function () {
        new Form(div);
      }).toThrowError(TypeError);
    });

    it('throws errors when passed a non-existent ID', () => {
      expect(function () {
        new Form('oh-yeah-its-the-form-napper');
      }).toThrowError(TypeError);
    });
  });

  describe('hijack', () => {
    it('assigns a handler to the form', () => {
      const spy = jest.fn();

      jest.spyOn(form.htmlForm, 'addEventListener');

      form.hijack(spy);

      expect(form.htmlForm.addEventListener).toBeCalled();
      expect(form.htmlForm.addEventListener).toBeCalledWith('submit', expect.any(Function), false);
    });

    it('prevents default on the submit event', () => {
      let event;
      const spy = jest.fn();

      jest.spyOn(form.htmlForm, 'addEventListener');

      form.hijack(spy);
      event = triggerEvent('submit', form.htmlForm);

      expect(event.preventDefault).toBeCalled();
    });

    it('calls handler on form submit', () => {
      const spy = jest.fn();

      jest.spyOn(form.htmlForm, 'addEventListener');

      form.hijack(spy);
      triggerEvent('submit', form.htmlForm);

      expect(spy).toBeCalled();
    });

    it('noops when calling thing a second time', () => {
      form.hijack(function () {});

      jest.spyOn(form.htmlForm, 'addEventListener');

      form.hijack(function () {});

      expect(form.htmlForm.addEventListener).not.toBeCalled();
    });
  });

  describe('inject', () => {
    it('modifies existing input values', () => {
      let actualInput;
      const expectedInput = document.createElement('input');

      expectedInput.name = 'foo';
      expectedInput.value = 'bar';
      testContext.htmlForm.appendChild(expectedInput);

      form.inject('foo', 'baz');
      actualInput = document.querySelector('input[name="foo"]');

      expect(actualInput.value).toBe('baz');
    });

    it('appends hidden input for nonexistent input name', () => {
      let input;

      form.inject('foo', 'bar');
      input = document.querySelector('input[name="foo"]');

      expect(input).toBeDefined();
      expect(input.type).toBe('hidden');
    });

    it('returns the existing input element', () => {
      const existingInput = document.createElement('input');

      existingInput.name = 'foo';
      testContext.htmlForm.appendChild(existingInput);

      expect(form.inject('foo', 'baz')).toBe(existingInput);
    });

    it('returns a newly-added input', () => {
      const result = form.inject('foo', 'bar');
      const newInput = document.querySelector('input[name="foo"]');

      expect(result).toBe(newInput);
    });
  });

  describe('submit', () => {
    it('calls the original form submit', () => {
      const stub = jest.spyOn(form.htmlForm, 'submit').mockImplementation();
      const prototypeStub = jest.spyOn(HTMLFormElement.prototype.submit, 'call').mockImplementation();

      form.submit();

      expect(stub).not.toBeCalled();
      expect(prototypeStub).toBeCalled();
    });
  });

  describe('detach', () => {
    it('calls removeEventListener', () => {
      jest.spyOn(form.htmlForm, 'removeEventListener').mockImplementation();

      form.submitHandler = 'fakeHandler';
      form.detach();

      expect(form.htmlForm.removeEventListener).toBeCalled();
      expect(form.htmlForm.removeEventListener).toBeCalledWith('submit', 'fakeHandler', false);
    });

    it('deletes the submitHandler', () => {
      jest.spyOn(form.htmlForm, 'removeEventListener').mockImplementation();

      form.submitHandler = 'fakeHandler';
      form.detach();

      expect(form.submitHandler).toBeUndefined(); // eslint-disable-line no-undefined
    });
  });
});
