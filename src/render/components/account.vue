<template lang="pug">
	section.account
		img(:src="`https://visage.surgeplay.com/full/512/${ user.id }`")
		div.info
			h2.nodrag {{ user.name }}
			p.id.nodrag {{ user.id }}
			button.logout.nodrag(@click="logout") Log Out
				div.slide Log Out
</template>

<script>
	import fs from 'fs'
	import electron from 'electron'

	const currentWindow = electron.remote.getCurrentWindow()

	export default {
		computed: {
			user () {
				return this.$store.state.user
			}
		},

		methods: {
			logout () {
				fs.unlinkSync(this.$store.state.paths.user)
				currentWindow.reload()
			}
		}
	}
</script>

<style lang="sass" scoped>
	.account
		overflow-y: hidden
		display: flex
		height: 100%
		justify-content: center
		align-items: center
		
		.info
			display: flex
			justify-content: center
			align-items: flex-start
			flex-direction: column

			h2
				font-weight: 200

			h2, .id
				display: inline-block
				background-color: var(--background)
				padding: 0.6rem

		img
			margin: 0 1rem
			height: 60%
			margin-right: 3rem

		.logout
			font-size: 1.5rem
			margin-top: 1rem
			clip-path: none

			.slide
				background-color: var(--red)
				color: white
</style>
