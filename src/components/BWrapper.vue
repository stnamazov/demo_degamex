<script setup>
import { defineProps } from 'vue'
const props = defineProps({
	type: {
		type: String,
		default: 'default'
	},
	color: {
		type: String,
		default: 'var(--main-color)'
	}
})
</script>

<template>

	<div v-if="props.type == 'default'" class="b-wrapper" :class="props.type">
		<div class="b-wrapper-top">
			<svg viewBox="0 0 949 73" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M70.708 8.28058L64.644 2H72.224L78.288 8.28058H70.708Z" :fill="props.color"/>
				<path d="M81.32 8.28058L75.256 2H93.448L99.512 8.28058H81.32Z" :fill="props.color"/>
				<path d="M102.544 8.28058L96.48 2H104.06L110.124 8.28058H102.544Z" :fill="props.color"/>
				<path d="M113.156 8.28058L107.092 2H114.672L120.736 8.28058H113.156Z" :fill="props.color"/>
				<path d="M123.768 8.28058L117.704 2H125.284L131.348 8.28058H123.768Z" :fill="props.color"/>
				<path d="M134.38 8.28058L128.316 2H135.896L141.96 8.28058H134.38Z" :fill="props.color"/>
				<path d="M144.992 8.28058L138.928 2H146.508L152.572 8.28058H144.992Z" :fill="props.color"/>
				<path d="M6.10352e-05 10.6762L10.4677 0.208618H56.8742L68.3885 11.723H939.151L948.572 21.1439V73H6.10352e-05V10.6762Z" fill="#19191a"/>
			</svg>
		</div>
		
        <div class="b-wrapper-body body">
        	<slot></slot>
        </div>

		<div class="b-wrapper-bottom">
			<svg viewBox="0 0 949 63" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 0.5V56.8462L6.01267 63H942.987L949 56.8462V0.5H0Z" fill="#19191a"/>
			</svg>
		</div>
    </div>

	<div v-else-if="props.type == 'type2'" class="b-wrapper" :class="props.type">
		<div class="b-wrapper-top">
			<svg viewBox="0 0 320 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3045 6L0 16.4363V80.5H320V26.8726L310.726 17.4799H67.3229L55.9879 6H10.3045Z" fill="#19191a"/>
                <path d="M178 10.5H79L72 17.5H185L178 10.5Z" :fill="props.color"/>
                <path d="M152 3C152 4.65685 150.657 6 149 6C147.343 6 146 4.65685 146 3C146 1.34315 147.343 0 149 0C150.657 0 152 1.34315 152 3Z" :fill="props.color"/>
                <path d="M250 11C250 12.6569 248.657 14 247 14C245.343 14 244 12.6569 244 11C244 9.34315 245.343 8 247 8C248.657 8 250 9.34315 250 11Z" :fill="props.color"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M184.293 3.5H149.5V2.5H184.707L192.707 10.5H245.5V11.5H192.293L184.293 3.5Z" :fill="props.color"/>
                <path d="M264 7H267V17H264V7Z" :fill="props.color"/>
                <path d="M271 7H274V17H271V7Z" :fill="props.color"/>
                <path d="M278 7H281V17H278V7Z" :fill="props.color"/>
                <path d="M285 7H288V17H285V7Z" :fill="props.color"/>
                <path d="M292 7H295V17H292V7Z" :fill="props.color"/>
            </svg>
		</div>
		
        <div class="b-wrapper-body body">
        	<slot></slot>
        </div>

		<div class="b-wrapper-bottom">
			<svg viewBox="0 0 318 56" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 40V0H318V40L302 56H16L0 40Z" fill="#19191a"/>
			</svg>
		</div>
    </div>

</template>

<style scoped>


    .b-wrapper{
		width: 100%;
	}
	.b-wrapper-top, .b-wrapper-bottom{
		width: 100%;
		height: 20px;
		overflow: hidden;
	}
	.b-wrapper-bottom{
		display: flex;
		align-items: flex-end;
	}
	.b-wrapper-body{
		background: #19191a;
		padding: 0 30px;
		padding-top: 10px;
	}


</style>
