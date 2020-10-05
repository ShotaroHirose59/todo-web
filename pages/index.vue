<template>
  <div v-if="user">
    <p>{{ user.name }}</p>
    <AddTodo @submit="addTodo" />
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'

export default {
  components: {
    AddTodo,
    TodoList,
  },
  data() {
    return {
      todos: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.currentUser
    },
  },
  methods: {
    addTodo(title) {
      this.todos.push({
        title,
      })
    },
  },
}
</script>

<style lang="stylus" scoped></style>
