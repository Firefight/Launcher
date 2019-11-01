import Vue from 'vue'
import Vuex from 'vuex'
import fs from 'fs'
import path from 'path'

const appdata = path.join(
	process.env.APPDATA || 
	
	(
		process.platform == 'darwin' 
			? process.env.HOME + 'Library/Preferences' 
			: process.env.HOME + "/.local/share"
	),

	'FireFight'
)

if (!fs.existsSync(appdata)) fs.mkdirSync(appdata)


const paths = {
	appdata,
	user: path.join(appdata, 'user.json'),
	optimizations: path.join(appdata, 'optimizations.json'),
	quality: path.join(appdata, 'quality'),
	theme: path.join(appdata, 'theme.json')
}

const state = {
    user: null,
    
    auth: null,
	
	page: 'welcome',

	view: '',
	
	panel: {
		expanded: false
	},

	quality: 
		fs.existsSync(paths.quality) 
			? Number( fs.readFileSync(paths.quality, { encoding: 'utf8' }) )
			: 2,

	optimizations: 
		fs.existsSync(paths.optimizations) 
			? JSON.parse( fs.readFileSync(paths.optimizations, { encoding: 'utf8' }) )
			: require('./optimizations.js').default,

	theme: 
		fs.existsSync(paths.theme) 
			? JSON.parse( fs.readFileSync(paths.theme, { encoding: 'utf8' }) )
			: [
				{
					name:"accent",
					value:"#FFAA00"
				},
				
				{
					name:"background",
					value:" #27272d"
				}
			],

	paths
}

const mutations = {
	setUser (state, payload) {
		Vue.set(state, 'user', payload)
    },
    
    setAuth (state, payload) {
		Vue.set(state, 'auth', payload)
    },

	setPage (state, payload) {
		Vue.set(state, 'page', payload)
	},

	setView (state, payload) {
		Vue.set(state, 'view', payload)
	},

	setPanelExpanded (state, payload) {
		Vue.set(state.panel, 'expanded', payload)
	},

	setOptimizations (state, payload) {
		Vue.set(state, 'optimizations', payload)

	},

	toggleOptimization (state, index) {
		Vue.set(state.optimizations[index], 'enabled', !state.optimizations[index].enabled)

		fs.writeFileSync(
			state.paths.optimizations, 
			JSON.stringify(state.optimizations, null, 4), 
			{ encoding: 'utf8' }
		)
	},

	setQuality (state, quality) {
		Vue.set(state, 'quality', quality)

		fs.writeFileSync(
			state.paths.quality, 
			quality,
			{ encoding: 'utf8' }
		)
	},

	setTheme (state, theme) {
		Vue.set(state, 'theme', theme)

		fs.writeFileSync(
			state.paths.theme, 
			JSON.stringify(state.theme, null, 4), 
			{ encoding: 'utf8' }
		)

		for (const { name, value } of theme) {
			document.body.style.setProperty(`--${name}`, value)
		}
	},
}

export default new Vuex.Store({
	state,
	mutations
})