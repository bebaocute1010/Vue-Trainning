export default {
  setUser(state, user) {
    state.user = user
  },
  login(state) {
    state.logined = true
  },
  logout(state) {
    state.logined = false
  },
  setInfoAlert(state, params) {
    state.alert.title = params.title
    state.alert.content = params.content
  },
  showAlert(state) {
    state.alert.isShowAlert = true
  },
  hideAlert(state) {
    state.alert.isShowAlert = false
  },
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
  resetNotifications(state) {
    state.notifications = []
  },
  setCount(state, count) {
    state.count = count
  },
  loadding(state) {
    state.isLoadding = true
  },
  loadded(state) {
    state.isLoadding = false
  }
}
