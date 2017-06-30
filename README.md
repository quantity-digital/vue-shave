# vue-shave
Simple Vue.js directive wrapper for shave.js

### Installing

Install from NPM

```
npm install vue-shave
```

Add to Vue with optional throttle setting

```
Vue.use( VueShave, { throttle: 400 });
```

### In use

Simple add `v-shave` with a height to a text node to instantiale Shavejs

```
<div v-shave="{ height: 80 }">
  ...
</div>
```

Other shave options

```
<div v-shave="{ height: 80, character: '!!!', spaces: false }">
  ...
</div>
```
