<script setup>
import { useStore } from 'vuex'
import { computed, watch, ref, onMounted } from 'vue'
import { isDemo, getDemoState, setDemoLootboxes, getDemoLootboxesTotalCount } from '@/demo/demo.js'
import { demoTraitsForTokenId } from '@/demo/degamerTraits.js'

import Loading from '@/components/Loading.vue'
import Icon from '@/components/Icon.vue'
import Button from "@/components/Button.vue"
import DWrapper from "@/components/DWrapper.vue"
import Modal from "@/components/Modal.vue"
import ArenaPlayer from "@/components/arena/ArenaPlayer.vue"
import ArenaUserData from "@/components/arena/ArenaUserData.vue"
import ArenaLeaderboard from "@/components/arena/ArenaLeaderboard.vue"
import ArenaCanvas from "@/components/arena/ArenaCanvas.vue"

const store = useStore()

const isConnecting = computed(() => store.getters.isConnecting)
const authToken = computed(() => store.getters.authToken)
const address = computed(() => store.getters.address)
const degamers = computed(() => store.getters.degamers)
const activeDegamer = computed(() => store.getters.activeDegamer)
const lootboxesCount = computed(() => store.getters.lootboxesCount)

const isLoading = ref(false)
const userData = ref({})
const tokenData = ref({})
const leaderboard = ref({})

const isJoining = ref(false)
const timer = ref(null)
const currentStatus = ref(null)
const modelMessage = ref(null)

const arena = ref(false)
const arenaTimer = ref(null)
const isArenaLoading = ref(true)

const isShowRPS = ref(false)
let sendFigure

const isShowResult = ref(false)
const result = ref({})

const msgDaily = `
	<p>Get 1 win to complete the Daily Task.</p>
	<p>30 Daily Tasks remain to upgrade your NFT Tier to Rare and then to Epic</p>`
const dailyClue = ref(false)

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function randomFigure() {
	const figures = ['rock', 'paper', 'scissors']
	return figures[Math.floor(Math.random() * figures.length)]
}

function rpsWinner(p1, p2) {
	if (p1 === p2) return null
	if (p1 === 'rock' && p2 === 'scissors') return 'player1'
	if (p1 === 'scissors' && p2 === 'paper') return 'player1'
	if (p1 === 'paper' && p2 === 'rock') return 'player1'
	return 'player2'
}

function rollArray() {
	return Array.from({ length: 5 }).map(() => (Math.random() < 0.25 ? 1 : 0))
}

function makeAttack({ from, to, spell }) {
	const base = 700 + Math.floor(Math.random() * 900)
	const critMul = Math.random() < 0.25 ? 2 + Math.floor(Math.random() * 2) : 1
	const isCrit = critMul > 1
	const blockPersent = Math.random() < 0.25 ? 20 * (1 + Math.floor(Math.random() * 4)) : 0
	const isBlock = blockPersent > 0
	const damage = base
	let totalDamage = Math.floor(damage * critMul * (1 - blockPersent / 100))
	if (totalDamage < 0) totalDamage = 0

	return {
		from,
		to,
		spell,
		damage,
		totalDamage,
		isCrit,
		critMul,
		isBlock,
		blockPersent,
		crit: rollArray(),
		block: rollArray(),
	}
}

async function joinArena(){

	if (!isJoining.value){

		isJoining.value = true
		isShowResult.value = false
		isShowRPS.value = false
		isArenaLoading.value = true

		if (isDemo) {
			modelMessage.value = null
			currentStatus.value = 'Searching for opponent...'

			let remaining = 5
			timer.value = `00:0${remaining}`
			const t = setInterval(() => {
				remaining -= 1
				timer.value = `00:0${Math.max(0, remaining)}`
				if (remaining <= 0) clearInterval(t)
			}, 1000)

			await sleep(1200)
			currentStatus.value = 'Opponent found. Entering Arena...'

			const demo = getDemoState()
			const myHasNft = (degamers.value || []).length > 0
			const myTokenId = myHasNft ? activeDegamer.value : 0
			// demo-only: keep a stable identifier, but not a real contract address
			const degamersCollection = 'demo://degamers'

			arena.value = {
				status: 0,
				player1: { address: address.value, tokenId: myTokenId, collection: myHasNft ? degamersCollection : '0x0', health: 10000, figure: null, traits: myHasNft ? demoTraitsForTokenId(myTokenId) : null },
				player2: { address: '0x000000000000000000000000000000000000BEEF', tokenId: 202, collection: degamersCollection, health: 10000, figure: null, traits: demoTraitsForTokenId(202) },
				moves: [],
				winnerAddress: null,
				drops: null,
			}

			isShowRPS.value = true
			arenaTimer.value = '00:15'

			sendFigure = async (figure) => {
				isShowRPS.value = false
				const enemyFigure = randomFigure()

				arena.value.player1.figure = figure
				arena.value.player2.figure = enemyFigure

				const winner = rpsWinner(figure, enemyFigure)
				const from = winner === 'player1' ? 'player1' : 'player2'
				const to = winner === 'player1' ? 'player2' : 'player1'

				// For status=1 ArenaCanvas expects moves[0] to indicate who starts
				arena.value.moves = winner ? [{ from, to }] : [{ from: 'player1', to: 'player2' }]
				arena.value.status = 1

				// Prepare attacks, but switch to status=2 only when RPS animation is likely finished.
				// ArenaCanvas starts attacks from its own rps_play event and checks status==2.
				// Spells must exist in BOTH:
				// - player animations: attack/<spell>, damage/<spell>
				// - ui_bottom animations: <spell>
				const spells = ['elon', 'hopium', 'ice_drone', 'lighting_blaster', 'pacman', 'poison', 'red_bar', 'vitalik']
				const attacks = []
				let turn = winner || 'player1'
				for (let i = 0; i < 6; i++) {
					const fromP = turn
					const toP = turn === 'player1' ? 'player2' : 'player1'
					attacks.push(makeAttack({ from: fromP, to: toP, spell: spells[i % spells.length] }))
					turn = toP
				}

				// wait enough for RPS to play (1s start + internal timing), then enable battle
				setTimeout(() => {
					arena.value.moves = attacks
					arena.value.status = 2
				}, 4000)

				let hp1 = 10000
				let hp2 = 10000
				for (const m of attacks) {
					if (m.to === 'player1') hp1 -= m.totalDamage
					if (m.to === 'player2') hp2 -= m.totalDamage
				}

				const iWon = hp1 >= hp2
				arena.value.winnerAddress = iWon ? address.value : arena.value.player2.address

				if (iWon) {
					const dropType = Math.random() < 0.75 ? 'base' : (Math.random() < 0.7 ? 'rare' : 'myth')
					arena.value.drops = [dropType]

					const lootboxes = [...(demo.lootboxes || [])]
					const idx = lootboxes.findIndex(l => l.type === dropType)
					if (idx >= 0) lootboxes[idx] = { ...lootboxes[idx], count: (parseInt(lootboxes[idx].count) || 0) + 1 }
					else lootboxes.push({ type: dropType, count: 1 })
					setDemoLootboxes(lootboxes)
					await store.dispatch('setLootboxesCount', getDemoLootboxesTotalCount())
				} else {
					arena.value.drops = null
				}

				// ArenaCanvas will emit @result after all attacks are done.
			}

			return
		}
	}

}

watch(authToken, async () => { }, { immediate: true })

async function leaveArena(){
	if (!isDemo) {
		if (arena.value.winnerAddress == address.value && arena.value.drops){
			await store.dispatch('setLootboxesCount', parseInt(lootboxesCount.value) + 1)
		}
	}
	arena.value = false
}


const randomName = () => {
	const f = ['Another', 'Random', 'Hopeless', 'Dazed', 'Unfortunate', 'Doomed', 'Oblivious', 'Confused', 'Clumsy', 'Lousy', 'Luckless']
	const s = ['Noob', 'Loser', 'Victim', 'Dude', 'Fool', 'Moron', 'Clown', 'Duck', 'Scapegoat', 'Punchbag', 'Rookie', 'Douchebag']

    const randomF = f[Math.floor(Math.random() * f.length)]
    const randomS = s[Math.floor(Math.random() * s.length)]

    return randomF + ' ' + randomS
}

const enemyName = randomName()

</script>

<template>

	<div class="flex items-center justify-center container my-[70px]">
		
		<Loading v-if="isLoading || isConnecting" class="w-[100px]" />

		<div v-else-if="arena" class="mt-[-50px] w-full h-full flex flex-col items-center justify-center">

			<div class="absolute w-full grid grid-cols-3 h-full">

				<div class="flex flex-col items-start mt-[100px]" >

					<div v-if="!isArenaLoading" class="flex flex-col items-center mt-10 ml-20 you max-w-[150px] text-center">
						<p v-if="arena.player1.address == address" class="text-main orbitron text-3xl uppercase font-black" >YOU</p>
						<p v-else-if="arena.player2.address == address" class="text-main orbitron text-xl uppercase font-black" >{{enemyName}}</p>
						<Icon type="you" class="w-5 -scale-x-100" />
					</div>

				</div>
				
				<div class="flex flex-col items-center justify-center gap-4" >
					<Loading v-if="isArenaLoading" class="w-[100px]" />
					<div v-else>

						<div v-if="arena.status == 0 && isShowRPS" class="flex flex-col items-center gap-4" >
							<Button @click="sendFigure('rock')" text="rock" stroke="#FAFF00" fill="#000" :width="200" />
							<Button @click="sendFigure('paper')" text="paper" stroke="#FAFF00" fill="#000" :width="200" />
							<Button @click="sendFigure('scissors')" text="scissors" stroke="#FAFF00" fill="#000" :width="200" />
						</div>

						<!--div v-if="arena.status == 2 && !isShowResult" class="flex flex-col items-center gap-4" >
							<Button @click="isShowResult = true" text="Skip animation" stroke="#FAFF00" fill="#000" :width="250" class="opacity-20" />
						</div-->
						
						<div v-else-if="arena.status == 2 && isShowResult" class="flex flex-col items-center text-center bg-black/80 p-10 rounded-xl" >
							<p class="text-main orbitron text-4xl uppercase font-black">{{ arena.winnerAddress == address ? 'You win' : 'You lost'}}</p>
							<div v-if="arena.winnerAddress == address && arena.drops" class="flex items-center my-5">
								<img v-if="arena.drops[0] == 'base'" class="w-[100px]" src="@/assets/lootbox/lootbox-result-base.svg" />
								<img v-if="arena.drops[0] == 'rare'" class="w-[100px]" src="@/assets/lootbox/lootbox-result-rare.svg" />
								<img v-if="arena.drops[0] == 'myth'" class="w-[100px]" src="@/assets/lootbox/lootbox-result-myth.svg" />
								<p class="orbitron text-sm uppercase w-[100px]" ><span class="text-2xl text-main font-black mr-1" >1х</span>{{arena.drops[0]}} lootbox</p>
							</div>
							<Button @click="leaveArena()" text="Leave Arena" stroke="#FAFF00" fill="none" :width="250" />
						</div>
						
					</div>
				</div>

				<div class="flex flex-col items-end mt-[100px]" >

					<div v-if="!isArenaLoading" class="flex flex-col items-center mt-10 mr-20 you max-w-[150px] text-center">
						<p v-if="arena.player2.address == address" class="text-main orbitron text-3xl uppercase font-black" >YOU</p>
						<p v-else-if="arena.player1.address == address" class="text-main orbitron text-1xl uppercase font-black" >{{enemyName}}</p>
						<Icon type="you" class="w-5" />
					</div>

				</div>

			</div>

			<ArenaCanvas 
				:arena="arena" 
				:timer="arenaTimer"
				@complete="isArenaLoading = false"
				@result="isShowResult = true"
			/>

		</div>
		
		<div v-else class="w-full flex flex-col lg:grid lg:grid-cols-3 gap-5">
			
			<div>

				<div class="flex flex-col items-center justify-end w-full">
					<DWrapper type="type2" >
						<ArenaPlayer 
							@joinArena="joinArena()" 
							:isJoining="isJoining"
							:timer="timer"
							:currentStatus="currentStatus"
						/>
					</DWrapper>
				</div>

				<!--div class="flex flex-col items-center justify-end w-full mt-10">
					<DWrapper type="type3" v-if="degamers.length > 0" >
						<div class="flex flex-col items-center text-center p-6" >
							<p class="orbitron text-xl w-full uppercase" >Skins</p>
							<p v-if="tokenData.tier" class="p-10" >You don't have any skins available for this Degamer yet</p>
							<Loading v-else class="w-[50px]" />
						</div>
					</DWrapper>
				</div-->

			</div>

			<div class="col-span-2">
				
				<DWrapper class="mb-5" >
					<ArenaUserData />
				</DWrapper>

				<DWrapper>
					<div class="px-5 md:px-14">
						<p class="orbitron text-3xl text-main uppercase font-black mb-5" >HOW TO PLAY?</p>

						<p class="orbitron italic uppercase font-black text-main text-2xl mt-10" >Join Arena</p>
						<p>Select your DeGamer in the left window and click the 'Join Arena' button, or simply click 'Join Arena' if you do not own any DeGamer NFTs yet. The platform will then start searching for an opponent. Once found, you will be redirected to the Arena to prepare for the battle.</p>
						<p>Every player starts with 10,000 HP. After the fight, the winner will receive one random LootBox (Base, Rare, or Epic). The higher your DeGamer Tier, the greater your chances of receiving Rare and Epic LootBoxes. Users without a DeGamer can still receive a LootBox, but their chances of obtaining rare LootBoxes, which contain more DeGameX Points, are significantly lower.</p>

						<p class="orbitron italic uppercase font-black text-main text-2xl mt-10" >First Move Draw</p>
						<p>Once you enter the arena, the right to the first move will be determined by a draw. The player who wins the Rock/Paper/Scissors (RPS) game gets the first move. Simply make your choice and wait for your opponent - the winner will attack first. If you don’t make a selection within the allocated time, the system will randomly choose for you</p>

						<p class="orbitron italic uppercase font-black text-main text-2xl mt-10" >Crit / Block</p>
						<p>The attacker has the opportunity to deal critical damage if 3 or more skulls are rolled.</p>
						<p>Critical damage acts as a multiplier of the spell's default damage. For instance, if you roll 3 skulls and your Hopium spell deals 1,000 damage, you would deal a total of 3,000 damage (1,000 x 3).</p>
						<p>The defender has the opportunity to block the attack if 3 or more shields are rolled. Each shield blocks 20% of the incoming damage.</p>
						<p class="mt-5 text-main">If the enemy rolls 5 skulls, the attack cannot be blocked, even with 5 shields.</p>

						<p class="orbitron italic uppercase font-black text-main text-2xl mt-10" >Type of Attack</p>
						<p>After calculating critical hits and blocks, the specific attack to be used and its base damage are determined. During the attack, the actual damage—considering critical hits and blocks—will be displayed and deducted from the opponent’s HP.</p>
						<p>Once an attack is executed, or when time runs out, the opportunity to attack passes to the other player, and the process repeats. Each player gets three turns.</p>

						<p class="orbitron italic uppercase font-black text-main text-2xl mt-10" >Victory</p>
						<p>The winner is the player who has the most HP remaining after all players have used their three turns.</p>

						<p class="mt-10 text-main" >Enjoy, and don’t forget that NFT tier upgrades will soon be integrated into the game!</p>

					</div>
				</DWrapper>

			</div>

		</div>

		<Modal v-if="modelMessage" @modal-close="modelMessage = false" class="airdrop-modal-blast">
			<p class="max-w-[480px] mx-auto" v-html="modelMessage"></p>
			<Button @click="modelMessage = false" text="OK" stroke="#FFFFFF" class="mt-6" />
		</Modal>

	</div>

</template>

<style scoped>
	.you{
		animation: you 0.5s infinite alternate-reverse;
		position: relative;
	}
	.loading{
		animation: loading 0.5s infinite alternate-reverse;
	}
	@keyframes you {
		0%{
			transform: rotate(-5deg);
			top: 20px;
		}
		100%{
			transform: rotate(5deg);
			top: 0px;
		}
	}
	@keyframes loading {
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0.5;
		}
	}
</style>