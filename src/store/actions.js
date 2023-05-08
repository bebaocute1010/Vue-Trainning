export default {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  loginned({ commit }) {
    commit('login')
  },
  logouted({ commit }) {
    commit('setUser', null)
    commit('logout')
    commit('resetNotifications')
  },
  setInfoAlert({ commit }, params) {
    commit('setInfoAlert', params)
  },
  showAlert({ commit }) {
    commit('showAlert')
  },
  hideAlert({ commit }) {
    commit('hideAlert')
  },
  setNotifications({ commit }, notifications) {
    commit('setNotifications', notifications)
  },
  resetNotifications({ commit }){
    commit('resetNotifications')
  },
  setCount({ commit }, count) {
    commit('setCount', count)
  },
  loadding({ commit }) {
    commit('loadding')
  },
  loadded({ commit }) {
    commit('loadded')
  },
}
