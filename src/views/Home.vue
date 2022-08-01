<template>
	<div class="container">
		<div class="wrapper">
			<h1 v-if="!saveduser">
				{{ greeting }}, <input type="text" placeholder="your name" v-model="user" />
			</h1>
			<h1 v-else>{{ greeting }}, {{ saveduser }}</h1>
		</div>
		<div class="actions">
			<button>create a new note</button>
			<button>view existing notes</button>
			<button @click="clean">Delete my data</button>
		</div>
	</div>
</template>

<script setup>
	import { ref, watch, onMounted } from 'vue'

	// variables
	const user = ref('')
	const saveduser = ref('')
	const greeting = ref('')

	// get hours function block
	const time0fday = new Date().getHours()
	if (time0fday >= 0 && time0fday <= 11) {
		greeting.value = 'Good morning'
	} else if (time0fday >= 12 && time0fday <= 17) {
		greeting.value = 'Good afternoon'
	} else {
		greeting.value = 'Good evening'
	}

	const clean = () => {
		localStorage.clear()
		window.location.reload()
	}
	// watchers
	watch(user, (newValue) => {
		localStorage.setItem('username', newValue)
		setTimeout(() => {
			window.location.reload()
		}, 3000)
	})

	onMounted(() => {
		saveduser.value = localStorage.getItem('username')
	})
</script>

<style scoped>
	.container {
		border: 1px solid;
		width: fit-content;
		padding: 10px;
	}
</style>
