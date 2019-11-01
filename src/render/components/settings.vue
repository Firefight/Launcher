<template lang="pug">
	section
		section.settings
			//- h3( label="optimizations" ) Optimizations
			//- h3( label="quality" ) Game Quality

			Optimizations
			//( v-if="subview === 'Optimizations'" )
			Quality
			//( v-if="subview === 'Quality'" )
			
		p.version FireFight launcher v{{ version }}
</template>

<script>
	const path = require('path')
	const { version } = require(path.join(__dirname, 'package.json'))

	import Optimizations from '~components/settings/optimizations'
	import Quality from '~components/settings/quality'

	export default {
		components: {
			Optimizations,
			Quality
		},

		data () {
			return {
				version,
				subview: 'Quality'
			}
		}
	}
</script>

<style lang="sass">
	.version
		font-weight: bold
		text-align: center
		opacity: 0.6
		position: absolute
		bottom: 2rem
		width: 100%

	section.settings
		& > div
			margin-bottom: 4rem
			
		& > div:last-child
			margin-bottom: 0
</style>
