<template lang="pug">
	section(class="drag")
		Titlebar
		Welcome(v-if="page === 'welcome'")
		Home(v-if="page === 'home'")
</template>

<script>
	import Welcome from '~pages/welcome'
	import Home from '~pages/home'
	import Titlebar from '~components/titlebar'

	export default {
		computed: {
			page () {
				return this.$store.state.page
			}
		},

		components: {
			Welcome, Titlebar, Home
		},

		mounted () {
			this.$store.commit(
				'setTheme',
				this.$store.state.theme
            )
		}
	}
</script>

<style lang="sass">
	@import '~styles/global'
</style>

<style lang="sass" scoped>
	section
		width: 100vw
		height: 100vh
</style>
