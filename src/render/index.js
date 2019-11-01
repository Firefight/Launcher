import Vue from 'vue'
import App from '~/App'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use({
	store: require('./store/index.js').default, 
	
	install ( Vue ) {
        Vue.prototype.$store = this.store
    }
})

new Vue({
	el: '#app',
	render (h) {
		return h(App)
	}
})