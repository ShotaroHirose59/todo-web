import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state: {
      currentUser: {},
      loading: false,
      successMessage: {
        status: false,
        message: '',
      },
    },
    mutations: {
      setUser(state, payload) {
        state.currentUser = payload
      },
      setLoading(state, payload) {
        state.loading = payload
      },
      setSuccessMessage(state, payload) {
        state.successMessage = payload
      },
    },
    actions: {},
  })
}

export default store
