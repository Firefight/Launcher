<template lang="pug">
	section
		div.bar
			div.bar.inner
		div.bar.blur
			div.bar.inner
		div.buttons
			span#minimize.nodrag(@click="window.minimize()")
			span#exit.nodrag(@click="window.close()")
</template>

<script>
	const body = document.querySelector('body').style
	const { remote } = require('electron')

	const currentWindow = remote.getCurrentWindow()

	export default {
		data () {
			return {
				window: currentWindow
			}
		},

		methods: {
			disableBar () {
				body.setProperty('--barwidth', '100vw')
				body.setProperty('--barend', '0')
				body.setProperty('--barstart', '0')
			},

			enableBar () {
				body.setProperty('--barwidth', '60vw')
				body.setProperty('--barstart', '-100vw')
				body.setProperty('--barend', '100vw')
			},
			
			barProgressMode () {
				body.setProperty('--barwidth', '0')
				body.setProperty('--barstart', '0')
				body.setProperty('--barend', '0')
			},

			setBarProgress ( percentage ) {
				body.setProperty('--barwidth', percentage + 'vw')
			}
		},

		async mounted () {
			const { disableBar, enableBar, setBarProgress, barProgressMode } = this

			Object.assign(
				window,
				{ disableBar, enableBar, setBarProgress, barProgressMode }
			)

			this.disableBar()

			let keyHistory = []

			const checkHistory = (string, time = 500) => {
				const history = keyHistory.filter(
					({ date }) => Date.now() - time < date
				).map(
					({ key }) => key // get keys from objects
				)
				
				return history.join('').indexOf(string) > -1
			}

			window.addEventListener('keydown', ({ key }) => {
				keyHistory.push({
					key: key.toLocaleLowerCase(), 
					date: Date.now() // store date for delay 
				})

				if ( checkHistory('escapeescape')  ) currentWindow.close()
				if ( checkHistory('secret menu', 5000) ) this.$store.commit('setView', 'Theme')
			})

		}
	}
</script>

<style lang="sass">
	body
		--barwidth: 60vw
		--barstart: -60vw
		--barend: 100vw
</style>

<style lang="sass" scoped>
	@keyframes loading 
		0% 
			left: var(--barstart)

		100%
			left: var(--barend)

	section
		position: absolute
		pointer-events: none
		background-color: none
		width: 0
		height: 0
		position: absolute
		overflow: hidden

		.bar
			position: absolute
			height: 8px
			width: 100vw

			.inner, &::before
				width: var(--barwidth)
				background-color: var(--accent)
				animation: loading 1.6s linear infinite
				transition: width 0.5s linear

			&::before
				background-color: var(--accent)
				width: 100%
				height: 8px
				opacity: 0.5
				content: ''


		.bar.blur 
			background-color: transparent
			height: 100px
			pointer-events: none
			opacity: 0.7
			
			.inner
				filter: blur(1rem)

		& > div
			height: calc(5rem + 8px)
			width: 100%
			display: flex
			justify-content: flex-end
			align-items: flex-start
			pointer-events: all
			position: relative
			z-index: 2

			&.buttons
				width: 6rem
				right: 0
				position: absolute

			#minimize::before
				content: ''
				border-bottom: 3px solid var(--accent)
				width: 1.2rem
				height: 0

			#exit
				&::before, &::after
					content: ''
					width: 0 
					height: 1.2rem
					border-left: 3px solid var(--accent)
					transform: rotate(45deg)

				&::before
					margin-right: -3px
					transform: rotate(-45deg)
			
			span
				width: 3rem
				height: 3rem
				display: flex
				justify-content: center
				align-items: center
				border-color: var(--accent)
				cursor: pointer
				margin-top: 8px

				&:hover
					background-color: var(--accent)

					&::before, &::after
						border-color: var(--background) !important

			// span#exit:hover
			// 	background-color: var(--red)

			// 	&::before, &::after
			// 		border-color: white !important

</style>
