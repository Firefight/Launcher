<template lang="pug">
	section.home
		div.logo
			img(src="~assets/firefight-logo.png")

		Subview(:view="view", v-if="view != ''")

		section(v-else)
			Nav
			Panel
</template>

<script>
	import Panel from '~components/panel'
	import Nav from '~components/nav'
	import Subview from '~components/view'
	import Vue from 'vue'

	export default {
		computed: {
			view () {
				return this.$store.state.view
			}
		},

		components: {
			Subview,
			Panel,
			Nav,
		}
	}
</script>

<style lang="sass">
	section.home
		width: 100%
		height: 100%
		padding-bottom: 2rem
		box-sizing: border-box

		.drag
			width: calc(100vw - 6rem)
			position: absolute
			top: 0
			left: 0
			height: 3rem
			z-index: 3
			-webkit-app-region: drag
			display: flex
			margin-top: 8px
			align-items: center
			justify-content: flex-start

		.back
			position: absolute
			top: calc(8px + 2rem)
			left: 1.6rem
			z-index: 5
			opacity: 0.7
			text-decoration: none
			font-weight: 600

			&:hover
				text-decoration: none
				opacity: 1


			span
				font-family: monospace
				transform: scaleX(0.7)
				margin-right: 6px
				text-decoration: line-through
				display: inline-block
				margin-bottom: -2px
				white-space: pre

		.logo
			width: 100%
			height: 100%
			display: flex
			justify-content: center
			align-items: center
			
			svg, img
				width: 70%

		h1
			font-size: 40px
			font-weight: 200
			letter-spacing: 0.5px
</style>
