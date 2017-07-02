Vue.use( VueShave, { throttle: 400 });
 
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
		addHodor: function() {
			this.hodor += ' hodor';
		},
		toggleComponents: function() {
			this.showComponents = !this.showComponents;
		},
	},
});
