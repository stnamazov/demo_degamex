<script setup>
	import axios from 'axios'
	import { ref, onUpdated, watch, onMounted } from 'vue'

	const isLoading = ref('')
	const svgBodyContent = ref('')
	const svgHeadContent = ref('')

	const loadSvgContent = async () => {
		const response = await axios.get(`/degamers/7777.svg`)
		const parser = new DOMParser()
		const svgDocument = parser.parseFromString(response.data, 'image/svg+xml')
		const svgBody = svgDocument.querySelector("#svgBody")
		const svgHead = svgDocument.querySelector("#svgHead")
		svgBodyContent.value = svgBody.innerHTML
		svgHeadContent.value = svgHead.innerHTML
	}

	onMounted(loadSvgContent)

</script>

<template>

<div class="degamer">
	<div class="degamer-body">
		<div class="degamer-head">
			<svg viewBox="0 0 854 853" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="svgHeadContent"></svg>
		</div>
		<svg viewBox="0 0 854 853" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="svgBodyContent"></svg>
	</div>
	<div class="degamer-params">
		<div class="degamer-token-id">
			<span class="degamer-token-id-value">#2222</span>
		</div>
		
		<div class="degamer-stats-list">
			<span class="data-item degamer-stats-data-item">
				<span class="data-label">Attack</span>
				<span class="data-value"></span>
			</span>
			<span class="data-item degamer-stats-data-item">
				<span class="data-label">Block</span>
				<span class="data-value"></span>
			</span>
			<span class="data-item degamer-stats-data-item">
				<span class="data-label">Critical</span>
				<span class="data-value"></span>
			</span>
		</div>
	</div>

</div>

</template>

<style scoped>
.degamer{
	display: flex;
	flex-direction: column;
	position: relative;
	height: ;
}
.degamer svg{
	width: 100%;
}
.degamer-body{
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 100%;
}
.degamer-head{
	position: absolute;
	width: 100%;
}
.degamer-effects{
	position: absolute;
}

.degamer-params{
	background: url('@/assets/nft-degamer-params-bg.svg');
}
.degamer-token-id{
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: bold;
	margin-top: 20px;
	margin-bottom: 20px;
}
.degamer-token-id-value{
	width: 100px;
	text-align: center;
}
.degamer-token-id .icon{
	margin: 10px 20px;
	cursor: pointer;
}
.degamer-token-id .icon:hover{
	transform: scale(1.05);
}
.degamer-token-id .icon:active{
	transform: scale(0.95);
}

</style>
