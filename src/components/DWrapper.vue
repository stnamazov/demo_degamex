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

	<div v-else-if="props.type == 'type3'" class="b-wrapper" :class="props.type">
		<div class="b-wrapper-top">
			<svg viewBox="0 0 1090 56" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M23.2482 0L0 23.2479V55.5H1089.11V44.5002L1048 0H23.2482Z" fill="#19191A"/>
			</svg>

		</div>
		
        <div class="b-wrapper-body body">
        	<slot></slot>
        </div>

		<div class="b-wrapper-bottom">
			<svg viewBox="0 0 1090 73" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M27.7192 73.0049L0.894344 46.18L0.758301 0H1089.94L1090 19.3552L1065.86 43.4975H176.15L146.643 73.0049H27.7192Z" fill="#19191A"/>
			</svg>
		</div>
    </div>

	<div v-else-if="props.type == 'type31'" class="b-wrapper" :class="props.type">
		<div class="b-wrapper-top">
			<svg viewBox="0 0 864 41" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 35.3858L35.4029 0H828.597L864 35.3858V285.614L828.597 321H646.525L636.41 310.89H434.95L424.835 321H35.4029L0 285.614V35.3858Z" fill="#19191A"/>
			</svg>
		</div>
		
        <div class="b-wrapper-body body">
        	<slot></slot>
        </div>

		<div class="b-wrapper-bottom">
			<svg viewBox="0 0 864 43" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 -242.614L35.4029 -278H828.597L864 -242.614V7.61417L828.597 43H646.525L636.41 32.8898H434.95L424.835 43H35.4029L0 7.61417V-242.614Z" fill="#19191A"/>
			</svg>
		</div>
    </div>
	

	<div v-else-if="props.type == 'type4'" class="b-wrapper" :class="props.type">
		<div class="b-wrapper-top">
			<svg viewBox="0 0 574 56" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M535 0L574 39V55.5H0V46L23.5 24H353.5L377.5 0H535Z" fill="#FAFF00"/>
			<path d="M348.931 18L361 6H345.914L333.845 18H348.931Z" fill="white"/>
			<path d="M327.81 18L339.879 6H303.672L291.603 18H327.81Z" fill="white"/>
			<path d="M285.569 18L297.638 6H282.552L270.483 18H285.569Z" fill="white"/>
			<path d="M264.448 18L276.517 6H261.431L249.362 18H264.448Z" fill="white"/>
			<path d="M243.328 18L255.397 6H240.31L228.241 18H243.328Z" fill="white"/>
			<path d="M222.207 18L234.276 6H219.19L207.121 18H222.207Z" fill="white"/>
			<path d="M201.086 18L213.155 6H198.069L186 18H201.086Z" fill="white"/>
			</svg>
		</div>
		
        <div class="b-wrapper-body body">
        	<slot></slot>
        </div>

		<div class="b-wrapper-bottom">
			<svg viewBox="0 0 574 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M23.5 33L0 9.5V0H574V9.5L550.5 33H23.5Z" fill="#FAFF00"/>
			</svg>
		</div>
    </div>

	<div v-else-if="props.type == 'type5'" class="b-wrapper" :class="props.type">
		<div class="b-wrapper-top">
			<svg viewBox="0 0 440 42" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M440.394 548.399V8.37716L432.459 0H330.113L307.786 22.1011H140.626L120.009 0L9.00221 0.000561672L0 8.81744V540.242L17.5909 557.655L93.4571 557.655L105.8 569.999H123.875L111.531 557.655H116.821L129.165 569.999H147.239L134.896 557.655H140.184L152.529 570H170.603L158.26 557.657L163.55 557.655L175.893 569.999H235.406L249.954 557.655L431.578 557.655L440.394 548.399Z" fill="white"/>
			<path d="M12.3058 8.00055L116.625 8.00002L137.242 30.1011H311.114L333.441 8H429.111L432.524 11.6037V545.29L428.242 549.785H20.919L8 536.997V12.2176L12.3058 8.00055Z" fill="#141415"/>
			<path d="M303.644 17.6333L315.197 6.17163H300.756L289.203 17.6333H303.644Z" fill="#FAFF00"/>
			<path d="M283.427 17.6333L294.979 6.17163H260.321L248.768 17.6333H283.427Z" fill="#FAFF00"/>
			<path d="M242.991 17.6333L254.544 6.17163H240.103L228.55 17.6333H242.991Z" fill="#FAFF00"/>
			<path d="M222.774 17.6333L234.327 6.17163H219.886L208.333 17.6333H222.774Z" fill="#FAFF00"/>
			<path d="M202.556 17.6333L214.109 6.17163H199.668L188.115 17.6333H202.556Z" fill="#FAFF00"/>
			<path d="M182.338 17.6333L193.891 6.17163H179.45L167.897 17.6333H182.338Z" fill="#FAFF00"/>
			<path d="M162.121 17.6333L173.674 6.17163H159.233L147.68 17.6333H162.121Z" fill="#FAFF00"/>
			</svg>

		</div>
		
        <div class="b-wrapper-body body">
        	<slot></slot>
        </div>

		<div class="b-wrapper-bottom">
			<svg  viewBox="0 0 440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M440.394 26.399V-513.623L432.459 -522H330.113L307.786 -499.899H140.626L120.009 -522L9.00221 -521.999L0 -513.183V18.2424L17.5909 35.6554L93.4571 35.6553L105.8 47.9987H123.875L111.531 35.6553H116.821L129.165 47.9987H147.239L134.896 35.6553H140.184L152.529 48H170.603L158.26 35.6566L163.55 35.6553L175.893 47.9987H235.406L249.954 35.6553L431.578 35.6554L440.394 26.399Z" fill="white"/>
			<path d="M12.3058 -513.999L116.625 -514L137.242 -491.899H311.114L333.441 -514H429.111L432.524 -510.396V23.2897L428.242 27.7853H20.919L8 14.9969V-509.782L12.3058 -513.999Z" fill="#141415"/>
			</svg>

		</div>
    </div>

	

</template>

<style scoped>


    .b-wrapper{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.b-wrapper svg{
		width: 100%;
		display: block;
	}
	.b-wrapper-top{
		margin-bottom: -1px;
		width: 100%;
	}
	.b-wrapper-bottom{
		margin-top: -1px;
		width: 100%;
	}
	.b-wrapper-body{
		width: 100%;
		background: #19191a;
	}
	
	.type4 .b-wrapper-body{
		background: var(--main-color);
	}

	.type5 .b-wrapper-body{
		background: #141415 url('@/assets/type5-bg-center.svg') repeat-y center center;
		background-size: 100%;
	}

	@media (max-width: 768px) {

	}


</style>
