import { createStore } from 'vuex'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getDemoState, getDemoLootboxesTotalCount } from '@/demo/demo.js'

const cookies = useCookies()

const store = createStore({
	state() {
		return {
			isScreen: false,
			// demo-only app: no wallet / no backend
			isConnecting: false,
			isSigning: false,
			authToken: null,
			address: null,
			degamers: [],
			activeDegamer: null,
			lootboxesCount: 0,
			inviteCode: null,
			modalMessage: null,
		}
	},
	getters: {
		isScreen(state) { 
			return state.isScreen 
		},
		isConnecting(state) { 
			return state.isConnecting 
		},
		isSigning(state) { 
			return state.isSigning 
		},
		address(state) { 
			return state.address 
		},
		authToken(state) { 
			return state.address != null ? state.authToken : null 
		},
		degamers(state) { 
			return state.degamers
		},
		activeDegamer(state) { 
			return state.activeDegamer
		},
		lootboxesCount(state) { 
			return state.lootboxesCount
		},
		modalMessage(state) { 
			return state.modalMessage
		}
	},
	mutations: {
		setConnectingStatus(state, status) {
			state.isConnecting = status
		},
		setSigningStatus(state, status) {
			state.isSigning = status
		},
		setToken(state, authToken) {
			state.authToken = authToken
		},
		setAddress(state, address) {
			state.address = address
		},
		setDegamers(state, degamers) {
			state.degamers = degamers
		},
		setActiveDegamer(state, tokenId) {

			if (tokenId == 'prev' || tokenId == 'next'){
				const index = state.degamers.indexOf(state.activeDegamer)
				if (tokenId == 'prev'){
					tokenId = index > 0 ? state.degamers[index - 1] : state.degamers[state.degamers.length - 1]
				} else {
					tokenId = index < state.degamers.length - 1 ? state.degamers[index + 1] : state.degamers[0]
				}
			}

			cookies.set("activeDegamerId", {
				tokenId: tokenId,
				owner: state.address 
			})
			state.activeDegamer = tokenId
		},
		setScreen(state, value) {
			state.isScreen = value
		},
		setLootboxesCount(state, count) {
			state.lootboxesCount = count
		},
		setModalMessage(state, message) {
			state.modalMessage = message
		}
	},
	actions: {

		async checkConnection({ commit }, options) {
			commit('setConnectingStatus', true)
			const demo = getDemoState()
			commit('setAddress', demo.address)
			commit('setDegamers', demo.degamers || [])
			commit('setActiveDegamer', demo.activeDegamer || (demo.degamers && demo.degamers[0]) || null)
			commit('setToken', demo.authToken)
			commit('setLootboxesCount', getDemoLootboxesTotalCount())
			commit('setConnectingStatus', false)
		},

		setActiveDegamer({ commit }, tokenId){
			commit('setActiveDegamer', tokenId)
		},

		setLootboxesCount({ commit }, count){
			commit('setLootboxesCount', count)
		},

		clearAuth({ commit }){
			// demo always “signed”
			return
		},

		setScreen({ commit }, value){
			commit('setScreen', value)
		},

		setModalMessage({ commit }, message){
			commit('setModalMessage', message)
		},

	}
})

// initialize demo state on boot
store.dispatch('checkConnection', { account: null })

export default store