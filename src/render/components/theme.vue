<template lang="pug">
	section.theme
		h3.header Secret Menu

		div.nodrag(v-for="(color, key) in theme") 
			h4 {{ color.name }}

			span.selector(
				:style="{ backgroundColor: color.value }" 
				@click="setSelector(color.name)"
			)
			
			ColorPicker(
				v-model="color.value" 
				v-show="activeSelector === color.name"
				@input="setColor(key, color.name, color.value)"
			)

		button.nodrag(@click="setDefault()") Reset
			div.slide Reset
</template>

<style lang="sass">
	section.theme
		padding: 3rem 5rem
		overflow: visible
		height: 100%
		box-sizing: border-box

		button
			clip-path: none
			font-size: 1.4rem
			margin-top: 2rem

		& > div
			position: relative
			width: 100%
			height: 2.6rem
			display: flex
			justify-content: center
			overflow: visible

		h4
			text-align: center
			display: inline-block
			margin: 0.5rem 0
			margin-right: auto

		.selector
			width: 2rem
			height: 2rem
			display: inline-block
			position: absolute
			right: 0
			border: 2px solid white
			cursor: pointer
			
		.vc-sketch
			margin: 1rem
			right: 0
			top: 0
			z-index: 5
			height: 20rem
			-webkit-app-region: no-drag

		input
			background-color: white
</style>


<script>
	import Vue from 'vue'
	const ColorPicker = require('vue-color').Sketch

	export default {
		data () {
			return {
				theme: [],
				activeSelector: ''
			}
		},

		components: {
			ColorPicker
		},

		methods: {
			setSelector ( color ) {
				Vue.set(this, 'activeSelector', color)
			},

			setColor ( key, name, { hex } ) {
				Vue.set(this.theme, key, {value: hex, name})
				this.$store.commit('setTheme', this.theme)
			},

			setDefault () {
				const defaultTheme = [ 
					{
						name:"accent",
						value:"#FFAA00"
					},
					
					{
						name:"background",
						value:" #27272d"
					}
				]

				this.$store.commit('setTheme', defaultTheme)
			}
		},

		mounted () {
			const style = getComputedStyle(document.body)
			
			for (const color of ['accent', 'background']) this.theme.push({
				name: color, 
				value: style.getPropertyValue(`--${color}`)
			})
		}
	}
</script>
