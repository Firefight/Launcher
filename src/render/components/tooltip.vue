<template lang="pug">
	section(:direction="direction" :style="{ opacity: active ? 1 : 0 }") 
		p {{ content }}
</template>

<style lang="sass" scoped>
	section
		height: 4rem
		margin: 0.5rem 0
		z-index: 100
		box-sizing: border-box
		display: flex
		justify-content: center
		align-items: center
		white-space: nowrap
		color: var(--accent)
		position: relative
		padding: 0 2rem
		opacity: 0
		transition: opacity 0.1s

		p
			position: relative
			z-index: 4

		&::before
			content: ''
			display: inline-block
			position: absolute

		&::after
			height: 100%
			content: ''
			display: inline-block
			position: absolute
			width: calc(100% - 2rem)
			background-color: var(--background)

		&[direction="left"]
			padding-left: 2.3rem
			&::before
				border: 0.5rem solid transparent
				border-right: 0.5rem solid var(--accent)
				left: 0

			&::after
				left: 1rem
				border-left: 0.2rem solid var(--accent)

		&[direction="right"]
			padding-right: 2.3rem
			&::before
				border: 0.5rem solid transparent
				border-left: 0.5rem solid var(--accent)
				right: 0

			&::after
				left: 1rem
				border-right: 0.2rem solid var(--accent)
</style>

<script>
	export default {
		props: ["content", "direction", "active"]
	}
</script>
