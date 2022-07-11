<template>
	<div class="app">
		<section class="greeting">
			<h2>
				welcome back,
				<input type="text" placeholder="your name" v-model="name" />
			</h2>
		</section>

		<form @submit.prevent.trim="addTodo">
			<h4>what's on your todo list today?</h4>
			<input type="text" placeholder="e.g. Read a new novel" v-model="input_content" />
			<h3>pick a category</h3>
			<div class="options">
				<label>
					<input type="radio" name="category" value="business" v-model="input_category" />
					<div>business</div>
				</label>
				<label>
					<input type="radio" name="category" value="personal" v-model="input_category" />
					<div>personal</div>
				</label>
				<label>
					<input type="radio" name="category" value="education" v-model="input_category" />
					<div>education</div>
				</label>
				<label>
					<input type="radio" name="category" value="finance" v-model="input_category" />
					<div>finance</div>
				</label>
			</div>
			<button>add todo</button>
		</form>

		<section class="todo-list">
			<h3>todo list</h3>
			<div
				class="list"
				v-for="todo in todos_ascend"
				:key="todo"
				:class="`todo-item ${todo.done && 'done'}`"
			>
				<input type="checkbox" placeholder="todo.done" v-model="todo.done" />
				<input type="text" v-model="todo.body" />
				<button @click="removeTodo(todo)">delete</button>
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
		margin-top: 40px;
	}

	.app {
		width: 500px;
		height: 100%;
		min-height: 70vh;
		border-radius: 5px;
		padding: 20px;
		border: 1px solid;
		box-shadow: 0 2px 8px rgba(101, 101, 101, 0.61);
		transform: translateX(80%);
	}
	.greeting {
		display: flex;
		justify-content: center;
	}
	.greeting h2 {
		font-size: 18px;
		text-transform: capitalize;
		letter-spacing: 1.4px;
		color: rgb(101, 101, 101);
	}

	.greeting input {
		min-width: 100px;
		padding: 5px;
		border: none;
		border-bottom: 1px solid rgba(204, 204, 204, 0.343);
		text-transform: capitalize;
		font-size: 15px;
		font-weight: bold;
		letter-spacing: 1.4px;
	}
	.greeting input::placeholder {
		text-transform: capitalize;
		font-size: 15px;
		font-family: cursive;
	}
	.greeting input:focus {
		outline: none;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form h4 {
		letter-spacing: 2px;
		text-transform: capitalize;
		font-size: 15px;
		font-weight: bold;
		color: gray;
	}
	form h3 {
		text-transform: capitalize;
		font-size: 17px;
		letter-spacing: 1.4px;
		color: gray;
	}
	form input[type='text'] {
		width: 400px;
		padding: 7px;
		border: none;
		border-bottom: 1px solid rgba(204, 204, 204, 0.343);
	}
	form input[type='text']:focus {
		outline: none;
	}

	form input[type='text']::placeholder {
		letter-spacing: 2px;
		font-size: 12px;
	}

	.options {
		display: flex;
	}
	.options label {
		margin-left: 20px;
		width: 100px;
		height: 60px;
		border-radius: 3px;
		border: 1px solid;
		display: flex;
		flex-direction: column;
		text-align: center;
		box-shadow: 0 2px 8px rgba(4, 4, 4, 0.225);
	}
	.options label div {
		text-transform: capitalize;
		font-size: 13px;
		font-weight: bold;
		letter-spacing: 1.4px;
		margin-top: 20px;
		color: rgba(0, 0, 0, 0.844);
	}

	.options input[type='radio'] {
		margin-top: 10px;
		margin-bottom: -10px;
	}

	form button {
		width: 200px;
		margin-top: 20px;
		padding: 7px;
		border: none;
		border-radius: 3px;
		cursor: pointer;
		border: 1px solid gray;
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 2px;
		font-size: 12px;
	}

	.todo-list {
		border: 1px solid;
		margin-top: 10px;
	}
	.list {
		display: flex;
	}
</style>
