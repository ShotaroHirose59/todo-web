import firebase from '@/plugins/firebase'
import axios from '@/plugins/axios'

const actions = {
  signup({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        const user = {
          email: res.user.email,
          name: payload.name,
          uid: res.user.uid,
        }
        axios.post('/v1/users', { user }).then((res) => {
          commit('setLoading', false) // ローディングをoffにする
          commit('setUser', res.data) // promiseの値をstoreに入れる
          this.$router.push('/')
        })
      })
      .catch((error) => {
        this.error = ((code) => {
          switch (code) {
            case 'auth/email-already-in-use':
              return '既にそのメールアドレスは使われています'
            case 'auth/wrong-password':
              return '※パスワードが正しくありません'
            case 'auth/weak-password':
              return '※パスワードは最低6文字以上にしてください'
            default:
              return '※メールアドレスとパスワードをご確認ください'
          }
        })(error.code)
      })
  },
  login({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('setSuccessMessage', {
          status: true,
          message: 'ログインしました',
        })
        setTimeout(() => {
          commit('setSuccessMessage', {})
        }, 2000)
        this.$router.push('/')
      })
      .catch((error) => {
        console.log(error)
        this.error = ((code) => {
          switch (code) {
            case 'auth/user-not-found':
              return 'メールアドレスが間違っています'
            case 'auth/wrong-password':
              return '※パスワードが正しくありません'
            default:
              return '※メールアドレスとパスワードをご確認ください'
          }
        })(error.code)
      })
  },
  logOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setSuccessMessage', {
          status: true,
          message: 'ログアウトしました',
        })
        setTimeout(() => {
          commit('setSuccessMessage', {})
        }, 2000) // 2秒後に隠す
        commit('setUser', null)
        this.$router.push('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  },
}

export default actions
