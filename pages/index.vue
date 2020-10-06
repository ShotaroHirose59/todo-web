<template>
  <div v-if="user">
    <p>{{ user.name }}</p>
    <AddTodo :user="user" @submit="addTodo" />
    <TodoList :todos="user.todos" />
  </div>
</template>

<script>
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import axios from '@/plugins/axios'

export default {
  components: {
    AddTodo,
    TodoList,
  },
  computed: {
    user() {
      return this.$store.state.currentUser
    },
  },
  methods: {
    async addTodo(todo) {
      const { data } = await axios.post('/v1/todos', { todo })
      this.$store.commit('setUser', {
        ...this.user,
        todos: [...this.user.todos, data],
      })
      this.$store.commit('setSuccessMessage', {
        status: true,
        message: 'Todoを作成しました',
      })
      setTimeout(() => {
        this.$store.commit('setSuccessMessage', {})
      }, 2000) // 2秒後に隠す
    },
  },
}
</script>

<style scoped></style>
