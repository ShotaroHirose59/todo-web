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
import firebase from '@/plugins/firebase'

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
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setSuccessMessage', {
            status: true,
            message: 'ログアウトしました',
          })
          setTimeout(() => {
            this.$store.commit('setSuccessMessage', {})
          }, 2000) // 2秒後に隠す
          this.$store.commit('setUser', null)
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped></style>
