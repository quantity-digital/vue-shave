import Vue from 'vue/dist/vue.esm';
import VueShave from '../dist/vue-shave.es2015';

Vue.use( VueShave, { throttle: 400, character: '-' });
 
// Init Vue!
new Vue({
	el: '#demo',
	data: function() {
		return {
			hodor: 'Hodor (click me)',
			showComponents: true,
		};
	},
	methods: {
		addHodor() {
			this.hodor += ' hodor';
		},
		toggleComponents() {
			this.showComponents = !this.showComponents;
		},
	},
});
