<template lang="pug">
	section
		div.nav-wrapper

			div.nav.nodrag
				button(
					@mouseover="setTooltip('Account', true)"
					@mouseout="setTooltip('Account', false)"
				) 
					Avatar

				button.list(
					@click="$store.commit('setView', 'Patch Notes')" 
					@mouseover="setTooltip('Patch Notes', true)"
					@mouseout="setTooltip('Patch Notes', false)"
				) 
					include ../svg/list.svg
					div.slide
						include ../svg/list.svg

				button(
					@click="$store.commit('setView', 'Settings')"
					@mouseover="setTooltip('Settings', true)"
					@mouseout="setTooltip('Settings', false)"
				) 
					include ../svg/gear.svg
					div.slide
						include ../svg/gear.svg
		
			div.nav-wrapper.tooltips.left
				Tooltip(:content="'Account'" :direction="'left'" :active="tooltips['Account']")
				Tooltip(:content="'Patch Notes'" :direction="'left'" :active="tooltips['Patch Notes']")
				Tooltip(:content="'Settings'" :direction="'left'" :active="tooltips['Settings']")

		div.nav-wrapper.right
			div.nav.nodrag
				button.discord(
					@click="shell.openExternal('https://discord.me/firefight')"
					@mouseover="setTooltip('Discord', true)"
					@mouseout="setTooltip('Discord', false)"
				)
					include ../svg/discord.svg
					div.slide
						include ../svg/discord.svg

				button(
					@click="shell.openExternal('https://firefig.ht')"
					@mouseover="setTooltip('Forum', true)"
					@mouseout="setTooltip('Forum', false)"
				)
					include ../svg/news.svg
					div.slide
						include ../svg/news.svg

				button(
					@click="shell.openExternal('https://store.firefig.ht')"
					@mouseover="setTooltip('Shop', true)"
					@mouseout="setTooltip('Shop', false)"
				)
					include ../svg/shop.svg
					div.slide
						include ../svg/shop.svg
		
			div.nav-wrapper.tooltips.right
				Tooltip(content="Discord" direction="right" :active="tooltips['Discord']")
				Tooltip(content="Forum" direction="right" :active="tooltips['Forum']")
				Tooltip(content="Store" direction="right" :active="tooltips['Shop']")
</template>

<script>
	import Avatar from '~components/avatar'
	import Tooltip from '~components/Tooltip'
	import Vue from 'vue'

	const { shell } = require('electron')

	export default {
		components: {
			Avatar,
			Tooltip,
		},

		data () {
			return {
				shell,
				tooltips: {
					'Account': false,
					'Patch Notes': false,
					'Settings': false,
					'Discord': false,
					'Forum': false,
					'Shop': false
				}
			}
		},

		methods: {
			setTooltip (tooltip, boolean) {
				Vue.set(this.tooltips, tooltip, boolean)
			}
		}
	}
</script>


<style lang="sass" scoped>
	.nav-wrapper
		position: absolute
		left: 0
		height: 100vh
		display: flex
		justify-content: center
		align-items: flex-start
		flex-direction: column
		pointer-events: none
		top: 0
		overflow: visible

		.tooltips
			display: flex
			flex-direction: column
			position: absolute

			&.left
				left: 5rem

			&.right
				right: 5rem
				align-items: flex-end
				

		.nav
			width: auto
			pointer-events: all
			border-left: none
			position: relative
			background-color: var(--accent)
			clip-path: polygon(calc(100% - 1rem) 0%, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%, 0 0)
			
			button
				width: 5rem
				height: 5rem
				cursor: pointer
				transform: translateZ(0)
				clip-path: none
				padding: 0

				&, .slide
					display: flex
					align-items: center
					justify-content: center

				.slide
					width: 100%
					height: 100%

				&.list svg
					width: 45%

				&.list
					// border-bottom: 1px solid rgba(black, 0.2)

				img, svg
					width: 50%
					height: 100%
					object-fit: contain
					margin: 0

			button.discord
				.slide
					background-color: var(--blurple)
					
					svg path
						fill: white !important

		&.right
			right: 0
			left: auto

			.nav
				clip-path: polygon(1rem 0, 100% 0, 100% 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)
</style>

