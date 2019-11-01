<template lang="pug">
	label(:checked="enabled")
		input(type="checkbox", v-model="enabled", @click="$emit('updated')")
</template>

<script>
	export default {
		props: ['startEnabled', 'click'],

		data () {
			return {
				enabled: false
			}
		},

		mounted () {
			this.enabled = this.startEnabled || false
		}
	}
</script>

<style lang="sass" scoped>
	label
		width: 5rem
		height: 2.5rem
		background-color: var(--background)
		margin-left: auto
		padding: 0
		transition: background-color 0.1s
		cursor: pointer
		display: flex
		justify-content: flex-start
		align-items: center
		position: relative

		input
			display: none

		&::after
			content: ''
			width: 1.8rem
			height: 1.8rem
			margin-left: 0.35rem
			background-color: var(--accent)
			transition: background-color 0.1s, margin-left 0.1s

		&[checked]
			background-color: var(--accent)

			&::after
				margin-left: calc(5rem - 1.8rem - 0.35rem)
				background-color: var(--background)
</style>
