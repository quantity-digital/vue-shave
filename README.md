# vue-shave
Simple Vue.js directive wrapper for [shave](https://github.com/dollarshaveclub/shave). This plugin also adds support for responsive media queries to shavejs. 

## Features

- Lightweight wrapper around `shave`.
- Runs `shave` on component updates.
- Adds responsive support to `shave`. 

## Installing

### With a module bundler (webpack, rollup, etc.)

```javascript
npm install vue-shave https://github.com/dollarshaveclub/shave.git
```

```javascript
// main.js
import VueShave from 'vue-shave';

Vue.use( VueShave );
```

**Note: We install `shave` from the github master branch as a temporary measure until support for attaching `shave` directly to DOM nodes is released.**

### CDN

```html
<script src="https://cdn.rawgit.com/dollarshaveclub/shave/f9715ab6/dist/shave.min.js"></script>
<script src="https://unpkg.com/vue-shave@1.0.1"></script>
```

**Note: Remember to include the shave library before `vue-shave`**

```javascript
// main.js

Vue.use( VueShave );
```


### Options

Add global options as the second parameter.

```javascript
// main.js

const shaveConfig = {
  throttle: 400,    // Throttle length in ms
  character: '!!!', // Override default elipsis character
  spaces: true,     // Spaces config (see shave documentation)
  height: 80        // Default shave height (see shave documentation)
}; 

Vue.use( VueShave, shaveConfig );
```



### Examples

Simply add `v-shave` with a height to a text node to instantiale `shave`.

```html
<div v-shave="{ height: 80 }">
  <!-- text -->
</div>
```

Height is inherited from the global options, so you can do:

```html
<div v-shave>
  <!-- text -->
</div>
```

All `shave` options are supported:

```html
<div v-shave="{ height: 80, character: '!!!', spaces: false }">
  <!-- text -->
</div>
```

**Have fun!**
