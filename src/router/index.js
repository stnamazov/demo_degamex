import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 }
	},
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/Home.vue')
		},
		{
			path: '/arena',
			name: 'arena',
			component: () => import('../views/Arena.vue')
		},
		{
			path: '/account',
			name: 'account',
			component: () => import('../views/Account.vue')
		},
		{
			path: '/leaderboard',
			name: 'leaderboard',
			component: () => import('../views/Leaderboard.vue')
		},
		{
			path: '/mint',
			name: 'mint',
			component: () => import('../views/Mint.vue')
		},
		{
			path: '/error',
			name: 'error',
			component: () => import('../views/Error.vue')
		},
		{
			path: '/*',
			name: 'error404',
			component: () => import('../views/Error.vue')
		}
	]
})

export default router
