JS Boilerplate
==============

At Braintree, we have adopted CommonJS as our module loader of choice. This allows us to freely reuse components across our properties, distribute to open source when appropriate and share code between client and server environments. This repository provides a quick-start boilerplate for spinning up a new Javascript based project.

### Installation

```
nvm use

# If node version is not installed
nvm install

npm i
```

Installing `gulp` globally is recommended.
```
npm i -g gulp
```

For this boilerplate, we are using [gulp.js](http://gulpjs.com). It is our build tool of choice at Braintree. We have used [Grunt](http://gruntjs.com) in the past and we still love it, but we have to choose one and for now, gulp wins.

If you would like to forego using gulp or grunt and just want to bang things out in the command line, we recommend globally installing eslint and browserify:

```
npm i -g eslint browserify
```

--------

### Usage

The main entry point to the project is `index.js`. This file provides the public interface you declare, helping to protect private methods and scope. By default, the build process uses [browserify's](http:/browserify.org) `--standalone` flag. This will expose the distributable file to other CommonJS consumers, as well as AMD. For Javascript that is intended to be used in the global scope of a browser window, this same setting exposes a `braintree` namespace.

--------

### Build


To build the JS Assets, run:

```
npm run build
```

Using command line:

```
browserify index.js --standalone braintree > dist/app.built.js
```

...We should add a 'release' build as well.

Either of these will build a browser ready bundle to `/dist`.

--------

### Testing

#### Linting

We use ESLint to enforce particular coding styles and guidelines. Performing static analysis on the repository also helps catch and parse errors that may arise before proceeding with and build, test, or run.

The configuration can be found in `.eslintrc`. Additionally, we ignore our distributions and node modules as well as any other vendored files that may end up in the project via the `.eslintignore` file.

Using gulp:

```
gulp lint
```

Command line:

```bash
 eslint /**/*.js
```

From package.json

```
npm run test
```

#### Browser & Device Testing

__In-house device lab__
- __Android__
  - Nexus 5 (Android 4.2+)
  - MotoG (Android 4+)
  - Nexus 7 Tablet (Android 4.2+)
  - Samsung Galaxy SIII (Android 4.2)
- __iOS__
  - iPhone 6 (iOS 8+)
  - iPhone 6+ (iOS 8+)
  - iPhone 5S (iOS 7+)
  - iPad mini (iOS 7+)
  - iPad 1st Gen (iOS5)

In addition to our in-house device lab we frequently these tools for hands-on browser testing.

- [__Modern.ie__](http://modern.ie) – A collection of Internet Explorer VMs from Microsoft. (We commonly support IE8+)
- [__Firefox__](https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/) – Download previous Firefox releases

#### Unit Testing
...need to add testing and a writeup about it

#### Functional Testing
...need to add testing and a writeup about it

--------

### Recommendations

The following is a collection of tools, libraries, and resources that we enjoy and use at Braintree.

- [__Lodash__](http://lodash.com/) – A functional utility library
- [__express.js__](http://expressjs.com/) – Web application framework for node.js
- [__consolidate.js__](https://github.com/visionmedia/consolidate.js/) – A collection of template engines for use in Express apps
- [__FastClick__](https://github.com/ftlabs/fastclick) – Touch library to eliminate 300ms delay on clicks. (_Note:_ This is not needed for Android devices running Chrome v32+ when appropriate meta tags are used.)
