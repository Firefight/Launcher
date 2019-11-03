<template lang="pug">
	section(
		class="nodrag"
		:style="{ height: expanded ? '10rem' : '5rem' }"
	)
		div(
			class="arrow" 
			@click="toggleExpanded()"
			:style="{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)' }"
		)
			span
			span

		div(class="top")
			h4 Alpha {{ percentage > 0 ?  `| ${percentage}%` : '' }}
				
			button( 
				v-if="!play_disabled" 
				@click="play" 
				:disabled="play_disabled" 
			)
				include ../svg/crosshair.svg
				| Play

				.slide
					include ../svg/crosshair.svg
					p Play

			button.kill( v-else @click="kill" ) 
				include ../svg/crosshair.svg
				| Kill
				.slide
					include ../svg/crosshair.svg
					p Kill

		div(class="bottom")
			div(v-for="i in status", class="status")
				Status(:color="i.color  + ''")
				p {{ i.name }}
</template>

<script>
	import Vue from 'vue'
	import Vuex from 'vuex'
	import axios from 'axios'
	import Status from '~components/status'
	import path from 'path'

	export default {
		data () {
			return {
				status: [],
				expanded: false,
				launchkit: { },
				play_disabled: false,
				in_game: false,
				discord_game_interval: null,
				percentage: 0
			}
		},

		components: {
			Status
		},

		methods: {
			kill () {
				// clearInterval(this.discord_game_interval)
				Vue.set(this, 'discord_game_interval', null)
				this.launchkit.stdin.write('/mc stop\n')
				// this.launchkit.stdin.write('/lk stop\n')
				Vue.set(this, 'play_disabled', false)
				console.log('killed')

				disableBar()
			},

			toggleExpanded ( ) {
				this.expanded = !this.expanded
				this.$store.commit('setPanelExpanded', this.expanded)
			},

			play ( ) {
				if (this.play_disabled) return

				Vue.set(this, 'play_disabled', true)

				enableBar() 

				const { spawn } = require('child_process')

				const launchkit = spawn('java', [
					'-jar', 
					path.join(
						require('electron').remote.app.getAppPath().replace('app.asar','').replace('resources', 'unpacked'), 
						'LaunchKit-1.7.jar'
					)
				])

                let barEnabled = true
                let validated = false

				launchkit.stdin.setEncoding('utf8')

				launchkit.stdout.on('data', rawData => {
					const data = rawData.toString('utf8')

					// console.log(data)
					
					if (data.includes("@ppm:")) switch ( true ) {
						case data.includes('ready'):
							launchkit.stdin.write(`/lk set pack https://raw.githubusercontent.com/Firefight/Launcher/pack/main.json\n`)
							launchkit.stdin.write(`/mc validate\n`)
							break

						case data.includes('validated'):
                            if (validated) break
                            validated = true
							const { accessToken, selectedProfile, user } = this.$store.state.auth
							launchkit.stdin.write(`/mc auth ${selectedProfile.name} mojang ${selectedProfile.id} ${accessToken}\n`)
							launchkit.stdin.write("/mc start\n")
							break

						case data.includes('progress'):
							const progress = Math.round(parseFloat(data.replace(/^.+\=/, ''))*10000) / 100

                            if (progress) Vue.set(this, 'percentage', progress)

							if (progress > 1) {
								if (barEnabled) {
									disableBar()
									barEnabled = false
								}

								setBarProgress( progress )
							}

							break

						case data.includes('stopped'):
                            if (!this.play_disabled) break
							this.kill()
							break

						case data.includes('running'):
                            disableBar()
                            Vue.set(this, 'percentage', 0)
							break
					}
				})

				// launchkit.stderr.on('data', data => console.log(data.toString('utf8')))
				
				launchkit.stdout.pipe(process.stdout)

				window.launchkit = launchkit

				Vue.set( this, 'launchkit', launchkit )
			}
		},

		async mounted () {
			const { data } = await axios('https://status.mojang.com/check')

			const names = {
				'session.minecraft.net': 'Session',
				'authserver.mojang.com': 'Auth',
				'api.mojang.com': 'API',
				'textures.minecraft.net': 'Textures'
			}

			const statuses = { }

			for (const i in data) {
				const [api, color] = Object.entries(data[i])[0]
				const name = names[api] || ''

				statuses[name.toLowerCase()] = {
					api, color, name,
					url: 'https://help.mojang.com/'
				}
			}

			const { auth, session, textures, api } = statuses

			Vue.set(this, 'status', [
				auth, session, api,

				{
					name: 'FireFight Server',
					color: null
				},

				{
					name: 'FFAPI',
					color: null
				}
			])

			window.addEventListener('keydown', event => {
				if (event.key === 'ArrowUp') Vue.set(this, 'expanded', true)
				if (event.key === 'ArrowDown') Vue.set(this, 'expanded', false)
				if (event.key === 'Enter') this.play()
				this.$store.commit('setPanelExpanded', this.expanded)
			})
		}
	}
</script>

<style lang="sass" scoped>
	section
		height: 10rem
		width: 100vw
		position: absolute
		overflow: hidden
		left: 0
		bottom: 0
		background-color: rgba(40,40,40,0.6)
		border-top: 2px solid var(--accent)
		transition: height 0.2s
		clip-path: polygon(calc(1rem - 2px) 0%, calc(100% - 1rem + 2px) 0%, 100% calc(1rem - 1px), 100% 100%, 0 100%, 0% calc(1rem - 1px))

		&::before, &::after
			content: ''
			position: absolute
			top: 0
			border: 0.5rem solid var(--accent)
			border-bottom: 0.5rem solid transparent

		&::before
			border-right: 0.5rem solid transparent

		&::after
			right: 0
			border-left: 0.5rem solid transparent

		.arrow
			display: flex
			position: absolute
			top: 0
			flex-direction: column
			width: 1.3rem
			height: auto
			left: calc(50vw - (1.3rem / 2))
			right: calc(50vw - (1.3rem / 2))
			cursor: pointer
			opacity: 0.6
			transition: transform 0.2s
			transform: rotate(180deg)
			margin-top: 5px

			&:hover
				opacity: 1

			span
				display: inline-block
				height: 12px
				width: 100%
				position: relative

				&:nth-of-type(2)
					margin-top: -7px

				&::before, &::after
					background-color: var(--accent)
					display: inline-block
					content: ''
					width: 60%
					height: 2px
					margin-top: 5px
					position: absolute
					transform: rotate(45deg)

				&::after
					right: 0
					transform: rotate(-45deg)
				

		.top, .bottom
			display: flex
			padding: 0.7rem
			height: 5rem
			box-sizing: border-box
			justify-content: center
			align-items: center

			h4
				letter-spacing: 0
				font-weight: 600
				padding-left: 1.3rem
				color: var(--accent)

			button
				width: 10rem
				margin-left: auto
				height: 100%
				display: flex
				justify-content: center

				.slide
					display: flex
					justify-content: center
					padding-top: 1px

				svg
					margin-right: 10px
					height: 2rem

				& > svg
					margin-top: 0.3rem

				p
					text-align: center

			.kill
				background-color: darkgray
				color: white

				& > svg
					margin-top: 0.15rem

				svg path
					fill: white !important

			.kill > .slide
				background-color: var(--red)
				color: white
				
				svg path
					fill: white !important

		.bottom
			border-top: 1px solid rgba(white, 0.1)

			.status
				display: flex
				justify-content: center
				align-items: center
				padding: 5px

				p
					margin: 5px
					color: var(--accent)
					font-size: 1.4rem

</style>
