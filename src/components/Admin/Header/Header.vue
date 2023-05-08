<template>
  <v-app-bar
    dense
  >
    <v-toolbar-title>Admin</v-toolbar-title>

    <v-spacer></v-spacer>

    <Notifications @markReadAll="markReadAll"></Notifications>
    <v-btn icon @click="logout">
      <v-icon>mdi-account-arrow-right</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
import Notifications from "./Notifications";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Header",
  components: { Notifications },
  computed: {
    ...mapGetters([
      'alert',
      'user',
      'notifications',
      'count'
    ])
  },
  mounted() {
    this.getNotifications()
  },
  methods: {
    ...mapActions([
      'setInfoAlert',
      'showAlert',
      'hideAlert',
      'setNotifications',
      'logouted',
      'setCount'
    ]),
    logout() {
      localStorage.removeItem('token')
      this.logouted()
      this.$router.push({ name: 'login' })
    },
    getNotifications() {
      axios.get('/admin/notifications')
        .then(response => {
          this.setNotifications(response.data.data.notifications)
          this.setCount(response.data.data.count)
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.showAlert()
        })
    },
    markReadAll() {
      console.log(123)
      axios.post('admin/mark-read-all')
        .then(response => {
          this.setCount(0)
          this.getNotifications()
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.showAlert()
        })
    }
  }
}
</script>

<style scoped>

</style>
