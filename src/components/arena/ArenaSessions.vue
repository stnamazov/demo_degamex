<script setup>
	import { defineProps, defineEmits, watch } from 'vue'
	import Img from "@/components/Img.vue";

	const now = Math.floor(new Date().getTime())

	const props = defineProps({
        sessions: {
			type: Array,
			default: []
		}
	})

	const emit = defineEmits(['connect-arena'])

	const imageUrl = (id) => {
		return `${import.meta.env.VITE_API_URL}/v1/degamers/image/${id}`
	}

</script>

<template>
	<div class="sessions">
		
		<div class="sessions-header sessions-item">
			<span class="sessions-item-user">Player</span>
			<span class="sessions-item-price">Points Bet</span>
			<span class="sessions-item-time">Expires in</span>
			<span class="sessions-item-play"></span>
		</div>

		<div class="sessions-list">
			<div class="sessions-item" v-for="(session, index) in props.sessions" v-bind:key="index" >
				<span class="sessions-item-user"><img :src="imageUrl(session.player1_token_id)" class="session-img" /><div>{{ session.player1_address.substr(0,4) + "..." + session.player1_address.substr(-4) }} #{{session.player1_token_id}}</div></span>
				<span class="sessions-item-price">{{session.value}}</span>
				<span class="sessions-item-time">
					<vue-countdown :time="session.remaining_seconds * 1000" v-slot="{ minutes, seconds }" class="countdown">
						{{ minutes < 10 ? '0' + minutes : minutes  }}:{{ seconds < 10 ? '0' + seconds : seconds }}
					</vue-countdown>
				</span>
				
				<span class="sessions-item-play"><button @click="emit('connect-arena', session.session_id)">Join</button></span>
			</div>
		</div>

	</div>
</template>


<style scoped>

.asessions{
	padding-bottom: 30px;
	width: 100%;
}

.sessions-header{
	border-bottom: 1px solid #ffffff;
	padding-bottom: 30px;
}
.sessions-header span{
	color: #ffffff;
	font-weight: normal;
	font-size: 14px;
}


.sessions-list{
	margin-top: 30px;
	padding-bottom: 30px;
}

.sessions-item{
	display: flex;
	align-items: center;
	padding: 10px 0;
}
.sessions-list .sessions-item:hover{
	background: #00000015;
}

.sessions-item-user{
	display: flex;
	align-items: center;
	width: 200px;
}
.session-img{
	width: 60px;
	margin-right: 15px;
}
.sessions-item-price{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	color: var(--main-color);
	width: 150px;
	font-weight: bold;
	margin-left: auto;
	margin-right: 30px;
}
.sessions-item-price .icon{
	width: 15px;
	margin-left: 6px;
}
.sessions-item-play{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	margin-left: 40px;
}
.sessions-item-play button{
	font-weight: bold;
	color: var(--main-color);
	text-transform: uppercase;
	border: none;
	background: none;
	font-size: 16px;
}
.sessions-header .sessions-item-play button{
	font-size: 11px;
}
.sessions-item-rank{
	width: 120px;
	display: flex;
	justify-content: center;
}

.sessions-item-time{
	width: 120px;
	display: flex;
	justify-content: center;
}
.sessions-item-time .icon{
	margin: 0;
	width: 18px;
}

</style>