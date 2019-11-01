<template lang="pug">
	div(class="login")
		input(
			placeholder="Email"
			v-model="email"
			:class="disabled ? 'disabled' : ''"	
		)

		input(
			placeholder="Password"
			v-model="password", type="password"
			@keypress=" e => { if (e.keyCode === 13 && cooldown === 0) auth() } "
			:class="disabled ? 'disabled' : ''"	
		)

		p(class="error", v-if="error") Invalid username or password.

		button(@click="auth", :class="disabled || cooldown ? 'disabled' : ''") Login
			div.slide Login
		
		div(class="cooldown", v-show="cooldown")
			span(
				v-for="i in [1,2,3,4,5,6,7,8,9,10]"
				class="bubble"
				:style="`background-color: ${cooldown >= i ? 'var(--accent)' : 'var(--background)'};`"
			)
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import fs from 'fs'

	const post = async ( endpoint, data ) => (
		await axios({
			method: 'post',
			url: 'https://authserver.mojang.com/' + endpoint,

			headers: {
				'Content-Type': 'application/json'
			},

			data
		})
	).data

	export default {
		props: ['automatic'],

		computed: {
			paths () {
				return this.$store.state.paths
			}
		},

		data () {
			return {
				email: '',
				password: '',
				show: false,
				error: false,
				disabled: false,
				cooldown: 0
			}
		},

		methods: {
			startCooldown () {
				Vue.set(this, 'cooldown', 10)

				const interval = setInterval(() => {
					Vue.set(this, 'cooldown', --this.cooldown)

					if (this.cooldown === 0) clearInterval(interval)
				}, 1000)
			},

			async auth () {
				try {
					enableBar()

					this.disabled = true
					this.error = false

					await this.login(
						await post('authenticate', {
							agent: {
								name: "Minecraft",
								version: 1
							},

							username: this.email,
							password: this.password
						})
					)

					return true
				} catch (error) {
					this.error = true

					this.disabled = false
					this.startCooldown()

					disableBar()

					if (!error.isAxiosError) throw error
				}
			},

			async login ({
				accessToken, clientToken
			}) {
				try {
					enableBar()

					const data = await post('refresh', {
						accessToken, 
						clientToken,
						requestUser: true
					})

					console.log({
						...data
                    })
                    
					this.$store.commit('setAuth', {
						...data
                    })
					
					this.$store.commit('setUser', data.selectedProfile)

					const { id } = data.selectedProfile

					// if (data.selectedProfile.name === "AeternumWulf")
					// 	document.querySelector('body').style.setProperty('--accent', '#00c3ff')

					// if (data.selectedProfile.name === "God_Dog_313")
					// 	document.querySelector('body').style.setProperty('--accent', '#008080')

					delete data.selectedProfile
					delete data.user

					fs.writeFileSync(
						this.paths.user, 
						
						JSON.stringify({
							...data, id
						}, null, 4), 

						{ encoding: 'utf8' }
					)

					disableBar()

					this.$store.commit('setPage', 'home')

					return true
				} catch (error) {
					this.show = true
					if (!error.isAxiosError) return console.error(error)

					disableBar()

					return false
				}
			},

			async autologin () {
				try {
					if (fs.existsSync(this.paths.user)) {
						return await this.login(
							JSON.parse(
								fs.readFileSync(
									this.paths.user, 
									{ encoding: 'utf8' }
								)
							)
						)
					}

					else this.show = true

					return false
				} catch (error) {
					console.error(error)
				}
			}
		},

		mounted () {
			if (this.automatic) this.autologin()
		}
	}
</script>

<style lang="sass" scoped>
	div.login
		width: 100%

		button
			margin-top: 1rem
			clip-path: none
			font-size: 1.5rem
			background-color: var(--background)
			color: var(--accent)

			.slide
				margin-left: -1px
				background-color: var(--accent)
				color: var(--background)

	.cooldown
		height: auto
		display: flex
		margin-top: 20px
		// margin-bottom: -0.5rem

		span
			width: 0.5rem
			height: 0.5rem
			border-radius: 0.5rem
			margin: 0 2px
			display: inline-block

	input
		margin: 0.5rem 0
		padding: 0.7rem
		width: 70%
		color: var(--accent)
		font-size: 1.2rem

	.error
		color: var(--red)
		leter-spacing: 0.5px
		font-weight: bold
		margin-top: 1rem
		margin-bottom: 0.5rem
</style>
