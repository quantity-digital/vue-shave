/**
 * index.js
 * - All our useful JS goes here, awesome!
 */

Vue.use( VueShave.VueShave, { throttle: 400 });
 
// Init Vue!
var app = new Vue({
  el: '#demo',
  data: function() {
    return {
      hodor: 'Hodor (click me)',
      showComponents: true,
    }
  },
  methods: {
    addHodor() {
      this.hodor += ' hodor';
    },
    toggleComponents() {
      this.showComponents = !this.showComponents;
    }
  } 
})
