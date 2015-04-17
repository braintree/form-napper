Form-napper [![Build Status](https://travis-ci.org/braintree/form-napper.svg)](https://travis-ci.org/braintree/form-napper) [![npm version](https://badge.fury.io/js/form-napper.svg)](http://badge.fury.io/js/form-napper)
===========

Hijack a `form` submit, inject data, resume.

Form Napper provides the ability to interrupt a submit flow and perform an asynchronous task (such as [Credit Card tokenization](https://developers.braintreepayments.com/javascript+node/sdk/client/credit-cards#tokenize-card)) and inject the results into your `form` before continuing.

## Example

```html
<form id="my-form">
  <label for="card-number">Card Number</label>
  <input type="text" name="card-number" />
  
  <label for="cvv">CVV</label>
  <input type="text" name="cvv" />
  
  <input type="submit" />
</form>
```

```javascript
var form = new FormNapper('my-form');

form.hijack(function (event) {
  console.log('This form\'s submit has been hijacked.');
});

form.inject('ransomNote', 'Send ransom to...');

form.submit();
```

## API

#### `FormNapper(selector: String): FormNapper` 

The `FormNapper` constructor accepts a single argument:

| Argument | Type | Description |
| -------- | ---- | ----------- |
| `id` | `String` | A reference to the `id` of your `form` element |

- - -

#### `hijack(callback: Function)`

The `hijack` method accepts a callback function that will provide an `event` object as an argument. This is the browser `Event` that accompanies the final `submit` attempt.

- - -

#### `inject(name: String, value: String)`

The `inject` method will inject a hidden `input` element into your `form` and accepts two arguments representing the `name` and `value` of that input.

If an input with the provided name is found, its value will be updated with the new value passed to `inject`.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| `name` | `String` | This will be written as the `name` attribute on the `input` element |
| `value` | `String` | This will be the corresponding value to the provided name. |

- - -

#### `submit()`

Calling `submit` will forcefully submit your `form` and bypass any attached event handlers.
