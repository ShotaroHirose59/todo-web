<template>
  <v-row>
    <v-col cols="12" md="4">
      <h2>Sign Up</h2>
      <form>
        <v-text-field
          v-model="name"
          :counter="10"
          label="Name"
          data-vv-name="name"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :counter="20"
          label="Email"
          data-vv-name="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
          data-vv-name="password"
          required
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          label="passwordConfirm"
          data-vv-name="passwordConfirm"
          required
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn class="mr-4" @click="signup">submit</v-btn>
        <p v-if="error" class="errors">{{ error }}</p>
      </form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    store.watch(
      (state) => state.currentUser,
      (newUser, oldUser) => {
        if (newUser) {
          return redirect('/')
        }
      }
    )
  },
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      show1: false,
      show2: false,
      error: '',
    }
  },
  methods: {
    signup() {
      if (this.password !== this.passwordConfirm) {
        this.error = 'パスワードとパスワード確認が一致していません'
      }
      this.$store.commit('setLoading', true) // ローディングをonにする
      this.$store.dispatch('signup', {
        email: this.email,
        password: this.password,
        name: this.name,
      })
    },
  },
}
</script>

<style scoped>
.errors {
  color: red;
  margin-top: 20px;
}
</style>
