<template>
	<div class="app">
		<section class="greeting">
			<h2 class="title">
				What's up,
				<input type="text" placeholder="Name here" v-model="name" />
			</h2>
		</section>
		<section class="create-todo">
			<h3>create a todo</h3>
			<form @submit.prevent.trim="addTodo">
				<h4>what's on your todo list today?</h4>
				<input type="text" placeholder="e.g. Read a new novel" v-model="input_content" />
				<h4>pick a category</h4>
				<div class="opions">
					<label>
						<input type="radio" name="category" value="business" v-model="input_category" />
						<div>business</div>
					</label>
					<label>
						<input type="radio" name="category" value="personal" v-model="input_category" />
						<div>personal</div>
					</label>
				</div>
				<input type="submit" value="Add todo" />
			</form>
		</section>
		<section class="todo-list">
			<h3>todo list</h3>
			<div class="list">
				<div
					v-for="todo in todos_ascend"
					:key="todo"
					:class="`todo-item ${todo.done && 'done'}`"
				>
					<label>
						<input type="checkbox" placeholder="todo.done" v-model="todo.done" />
					</label>
					<div class="todo-content">
						<input type="text" v-model="todo.body" />
					</div>
					<div class="actions">
						<button @click="removeTodo(todo)">delete</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { ref, onMounted, computed, watch } from 'vue'
	const todos = ref([])
	const name = ref('')
	const input_content = ref('')
	const input_category = ref(null)

	const todos_ascend = computed(() =>
		todos.value.sort((a, b) => {
			return b.createdAt - a.createdAt //sort and display the list in ascending order
		})
	)

	const addTodo = () => {
		if (input_content === '' || input_category === null) {
			return
		}
		todos.value.push({
			body: input_content.value,
			category: input_category.value,
			done: false,
			createdAt: new Date().getTime(),
		})
		input_content.value = ''
		input_category.value = null
	}

	const removeTodo = (todo) => {
		todos.value = todos.value.filter((t) => t != todo)
	}

	watch(
		todos,
		(newValue) => {
			localStorage.setItem('todos', JSON.stringify(newValue))
		},
		{ deep: true }
	)
	watch(name, (newValue) => {
		localStorage.setItem('name', newValue)
	})
	onMounted(() => {
		name.value = localStorage.getItem('name') || ''
		todos.value = JSON.parse(localStorage.getItem('todos')) || []
	})
</script>
<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
