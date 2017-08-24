# vue-shave
Simple Vue.js directive wrapper for [shave](https://github.com/dollarshaveclub/shave). This plugin also adds support for responsive media queries to shavejs. 

## Features

- Lightweight wrapper around `shave`.
- Runs `shave` on component updates.
- Adds responsive support to `shave`. 

## Installing

### With a module bundler (webpack, rollup, etc.)

Shave is installed as a dependency of vue-shave. 

```javascript
npm install vue-shave
```

Then initialize the plugin.

```javascript
// main.js
import VueShave from 'vue-shave';

Vue.use( VueShave );
```

### CDN

Include shave and vue-shave. 

**Note: Remember to include the shave library before `vue-shave`**

```html
<script src="https://unpkg.com/shave@2.0.2"></script>
<script src="https://unpkg.com/vue-shave@1.0.3"></script>
```

Then initialize the plugin.

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
