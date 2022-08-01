import Home from '@/views/Home'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: Home,
		meta: { title: 'Journey book' },
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

// dynamic title
router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title}`
	next()
})

export default router
