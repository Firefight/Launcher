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
	.slider-wrapper
		display: flex
		flex-direction: column
		width: 100%
		height: 3.4rem
		overflow-x: hidden
		padding-top: 0.2rem

		&[quality="3"]
			.rainbow
				background: linear-gradient(70deg, var(--red), blue, #05ff79, var(--red), blue, #05ff79, var(--red))

	@keyframes rainbow
		0%
			right: 0

		100%
			right: 100%

	.rainbow
		width: 200%
		margin-bottom: -2rem
		height: 2rem
		position: relative
		right: 0
		pointer-events: none
		animation: infinite rainbow 1s linear
		background: var(--accent)

	.labels
		display: flex
		align-items: center
		justify-content: center
		margin-top: -0.6rem

		h4
			width: 33.33%
			opacity: 0.6
			transition: opacity 0.2s, text-shadow 0.2s

			&.active
				opacity: 1
				// text-shadow: 0 0 0.3rem var(--accent)

		[label="Normal"]
			margin: 0 auto
			text-align: center

		[label="Extreme"]
			text-align: right

	.description
		margin: 0 auto
		text-align: center
		opacity: 1
		font-weight: 200
		font-size: 1.3rem
		margin-top: 0.2rem

	.slider
		-webkit-appearance: none
		appearance: none
		border: none
		width: 100%
		background-color: transparent
		cursor: pointer

	.slider::-webkit-slider-thumb
		-webkit-appearance: none
		height: 2rem
		width: 2rem
		opacity: 0

	.slider-thumb
		height: 3.4rem
		width: 2rem
		margin-top: -2.2rem
		transition: margin-left 0.4s
		pointer-events: none
		position: relative
		z-index: 2

		.box
			height: 2.4rem
			width: 2rem
			background-color: white


		.arrow
			border: 1rem solid transparent
			border-top: 1rem solid white
			position: relative
		

	h4
		margin-top: 0
		font-size: 1.5rem

		span
			font-weight: 200
			opacity: 0.8
			font-size: 1.0rem
			letter-spacing: 0.5px
</style>
