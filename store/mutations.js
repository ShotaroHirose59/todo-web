const mutations = {
  setUser(state, payload) {
    state.currentUser = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setSuccessMessage(state, payload) {
    state.successMessage = payload
  },
}

export default mutations
