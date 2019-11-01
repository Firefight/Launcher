<template lang="pug">
	button#avatar-wrapper.nodrag(v-if="user" @click="$store.commit('setView', 'Account')") 
		img.avatar(:src="`https://visage.surgeplay.com/head/512/${ user.id }`")
		div.slide
</template>

<script>
	export default {
		computed: {
			user () {
				return this.$store.state.user
			}
		}
	}
</script>

<style lang="sass" scoped>
	#avatar-wrapper
		height: 5rem
		width: 5rem
		position: relative
		// clip-path: polygon(calc(100% - 1rem) 0%, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%, 0 0)
		cursor: pointer
		box-sizing: border-box
		bottom: 0
		// margin-top: -2rem
		z-index: 0
		background-color: var(--accent)
		cursor: pointer
		pointer-events: all
		padding: 0
		display: flex
		justify-content: center
		align-items: center

		.avatar
			width: 80%
			height: 80%
			object-fit: contain
			position: relative
			z-index: 3
</style>
