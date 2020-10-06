<template>
  <div>
    <div v-if="user">
      <p>Email: {{ user.email }}</p>
      <p>ユーザー名: {{ user.name }}</p>
    </div>
    <v-btn @click="logOut">ログアウト</v-btn>
  </div>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    store.watch(
      (state) => state.currentUser,
      (newUser, oldUser) => {
        if (!newUser) {
          return redirect('/login')
        }
      }
    )
  },
  computed: {
    user() {
      return this.$store.state.currentUser
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    },
  },
}
</script>

<style scoped></style>
