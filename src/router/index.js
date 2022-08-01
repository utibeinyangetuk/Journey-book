import Home from '@/views/Home'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: Home,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
