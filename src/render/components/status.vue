<template lang="pug">
	div
		div(v-if="color === 'green'")
			include ../svg/green.svg

		div(v-if="color === 'red'")
			include ../svg/red.svg

		div(v-if="color === 'yellow'")
			include ../svg/yellow.svg

		div(v-if="color === 'null'")
			include ../svg/null.svg
</template>

<script>
	export default {
		props: ['color']
	}
</script>

<style lang="sass" scoped>
	svg
		height: 1.3rem
		width: 1.3rem
		object-fit: contain
		margin: 5px
</style>
