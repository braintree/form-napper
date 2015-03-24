Form-napper
===========

Hijack, submit, and inject data into forms

### Installation

```
nvm use

# If node version is not installed
nvm install

npm i
```

## API

```javascript
var form = FormNapper('my-form-id');

form.hijack(function (event) {
  console.log('This form\'s submit has been hijacked.');
});

form.inject('ransomeNote', 'Send ransom to...');

form.submit();
```
