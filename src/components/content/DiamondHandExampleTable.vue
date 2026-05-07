<script setup>

import { ref } from "vue"
const data = ref([
	[ 1.11, 1.17, 1.4, 1.7, 2 ],
	[ 1.12, 1.24, 1.7, 2.3, 2.9 ],
	[ 1.13, 1.31, 2, 2.9, 3.8 ],
	[ 1.14, 1.38, 2.3, 3.5, 4.7 ],
	[ 1.15, 1.45, 2.6, 4.1, 5 ]
])

</script>

<template>
	<div class="table">
		<div class="row header">
			<div class="degamers cell">NFTs</div>
			<div class="cell">D</div>
			<div class="cell">W</div>
			<div class="cell">1M</div>
			<div class="cell">2M</div>
			<div class="cell">3M</div>
		</div>
		<div v-for="(row, index) in data" v-bind:key="index" class="row">
			<div class="degamers cell">{{index + 1}}</div>
			<div v-for="(data, n) in row" v-bind:key="n" class="cell">{{data}}x</div>
		</div>
	</div>
</template>

<style scoped>
	.table{
		width: 100%;
	}
	.row{
		display: flex;
		flex-wrap: wrap;
	}
	.cell{
		text-align: center;
		background: rgb(21, 21, 22);
		margin: 1px;
		border-radius: 2px;
		font-weight: bold;
		color: var(--main-color);
		width: 16%;
	}
	.degamers{
		color: white;
		background: none;
	}
	.header .cell{
		color: white;
		background: none;
	}

	
	

</style>
