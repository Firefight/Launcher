<template lang="pug">
	div.optimizations.nodrag
		h3 Optimizations
		div(v-for="(i, key) in optimizations")
			h3 {{ i.name }}
			h3.recommended(v-if="i.recommended") - Recommended
			FFSwitch(:startEnabled="i.enabled", @updated="toggleOptimization(key)")
</template>

<script>
	import FFSwitch from '~components/settings/switch'

	export default {
		computed: {
			optimizations () {
				return this.$store.state.optimizations
			}
		},

		methods: {
			toggleOptimization ( index ) {
				this.$store.commit('toggleOptimization', index)
			}
		},

		components: {
			FFSwitch
		}
	}
</script>

<style lang="sass" scoped>
	.optimizations
		& > div
			padding: 0.5rem 0
			display: flex
			align-items: center
			justify-content: center
			border-bottom: 1px solid rgba(white, 0.05)

			*
				user-select: none

			&:last-child
				border-bottom: transparent

			.recommended
				margin-left: 0.1rem
				color: var(--accent)
				opacity: 0.8
				padding: 0.2rem
</style>
