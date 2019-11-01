<template lang="pug">
	section
		div(class="nodrag")
			h3 Sign in with your Mojang Account

			div.purchase-minecraft
				h5 Don't own Minecraft? Click 
				a(@click="shell.openExternal(`https://www.minecraft.net/en-us/store/`)") Here

			Login(:automatic="true")
</template>

<script>
	import electron from 'electron'
	import Login from '~components/login'

	const { shell } = electron

	export default {
		data () {
			return {
				shell
			}
		},

		components: {
			Login
		}
	}
</script>

<style lang="sass" scoped>
	section
		width: 100%
		height: 100%
		display: flex
		justify-content: center
		align-items: center
		
		& > div
			width: 500px
			height: 430px
			background-color: var(--background)
			box-shadow: 0 0 8px 4px rgba(black, 0.3)
			color: white

			&, & > div
				display: flex
				flex-direction: column
				justify-content: center
				align-items: center

			.purchase-minecraft, h3
				margin-bottom: 1rem

			h3, h5
				font-weight: 200
				opacity: 0.9
				mix-blend-mode: difference

			.purchase-minecraft
				flex-direction: row

				a, h5
					font-size: 0.9rem
					display: inline-block
					white-space: pre
</style>
