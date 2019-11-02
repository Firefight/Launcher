<template lang="pug">
	div.quality.nodrag
		h3 Game Quality

		div.slider-wrapper(:quality="quality")
			div.rainbow

			input.slider(
				type="range" 
				min="1" 
				max="3" 
				@input="setQuality" 
				:value="quality"
			) 
			
			div.slider-thumb(:style="{marginLeft: `calc(${(quality - 1) * 50 }% - ${quality - 1}rem)`}")
				div.box
				div.arrow
	
		div.labels
			h4(
				 v-for="(label, key) in ['Low', 'Normal', 'Extreme']" 
				 :label="label" 
				 :class="{ active: quality - 1 === key }" 
			) {{ label }} 

		h4.description Description: {{ ['I has Potato', 'The average pc', 'Balls to the wall'][quality - 1] }}
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

<style lang="sass" scoped>
    @import './slider.sass'
</style>
