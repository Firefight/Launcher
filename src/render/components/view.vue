<template lang="pug">
	div.view(v-if="view !== ''")
		div.drag
		a.nodrag.back(@click="$store.commit('setView', '')") 
			span &lt; 
			|Back
		Settings(v-if="view === 'Settings'")
		PatchNotes(v-if="view === 'Patch Notes'")
		Account(v-if="view === 'Account'")
		Theme(v-if="view === 'Theme'")
</template>

<script>
	import Settings from '~components/settings'
	import Account from '~components/account'
	import Theme from '~components/theme'
	import PatchNotes from '~components/patchnotes'

	export default {
		props: ['view'],

		components: {
			Settings,
			Account,
			PatchNotes,
			Theme,
		}
	}
</script>


<style lang="sass">
	.view
		width: 100%
		height: 100vh
		color: var(--accent)
		overflow: auto
		box-sizing: border-box
		transition: height 0.2s
		position: fixed
		z-index: 1
		top: 0rem
		left: 0
		padding-top: 8px
		box-sizing: border-box
		background-color: rgba(30,30,30, 0.6)
		padding-top: calc(3rem + 8px)

		& > section > section
			overflow: auto
			height: 100%
			padding: 3rem 5rem
			box-sizing: border-box

		& > section > section:not(.patchnotes) > h3, 
		& > section > section:not(.patchnotes) > div > h3, 
		h3.header
			font-weight: 200
			font-size: 1.5rem
			padding-bottom: 0.5rem
			margin-bottom: 1.2rem
			border-bottom: 2px solid var(--accent)
</style>
