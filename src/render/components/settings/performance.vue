<template lang="pug">
	div.quality.nodrag
		h3 Performance

        \Memory: 
		input(type="number" min="1" value="1")
        \ GB
</template>

<script>
	export default {
		computed: {
			quality () {
				return this.$store.state.quality
			}
		},

		methods: {
			setQuality ({ target: { value } }) {
				this.$store.commit('setQuality', value)
			}
		}
	}
</script>