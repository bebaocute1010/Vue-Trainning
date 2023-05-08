<template>
  <v-app>
    <v-card>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        app
      >
        <v-list-item class="px-2">

          <v-menu
            open-on-hover
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
                <v-list-item-avatar
                  v-bind="attrs"
                  v-on="on">
                  <v-img :src="(user && user.avatar) ? user.avatar : 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'"/>
                </v-list-item-avatar>
            </template>

            <v-list>
              <v-list-item
                link
                @click="openEditProfileDialog"
              >
                <v-list-item-title>Edit profile</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                @click="changePasswordDialog = !changePasswordDialog"
              >
                <v-list-item-title>Change password</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>


          <v-list-item-content>
            <v-list-item-title>{{ user ? user.name : '...' }}</v-list-item-title>
            <v-list-item-subtitle>{{ user ? 'Logged In' : 'Loadding' }}</v-list-item-subtitle>
          </v-list-item-content>
          <Notifications @markReadAll="markReadAll"/>

          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

        </v-list-item>

        <v-divider></v-divider>

        <v-list dense
                v-if="user && user.role === 0"
        >
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="{name: item.to}"
            >
              <v-list-item-icon><v-icon>{{item.icon}}</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-main>
      <v-container fluid>
        <EditProfile :user="user_online" :dialog="editProfileDialog" @refreshUser="getMe" @closeDialog="editProfileDialog = false"></EditProfile>
        <ChangePassword :dialog="changePasswordDialog" @closeDialog="changePasswordDialog = false"></ChangePassword>
        <main>
          <slot></slot>
        </main>
      </v-container>
    </v-main>

    <v-footer app>
    </v-footer>

    <v-overlay :value="isLoadding">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>

</template>

<script>
import Notifications from "../Admin/Header/Notifications";
import {mapActions, mapGetters} from "vuex";
import EditProfile from "../Admin/Users/EditProfile";
import ChangePassword from "../Admin/Users/ChangePassword";

export default {
  name: "DefaultLayout",
  components: {ChangePassword, EditProfile, Notifications },
  data() {
    return {
      drawer: false,
      selectedItem: 1,
      items: [
        { text: 'Posts', to: 'posts', icon: 'mdi-note-text'},
        { text: 'Users', to: 'users', icon: 'mdi-account-multiple' }
      ],
      mini: false,
      editProfileDialog: false,
      changePasswordDialog: false,
      user_online: null
    }
  },
  computed: {
    ...mapGetters([
      'alert',
      'user',
      'notifications',
      'count',
      'isLoadding'
    ])
  },
  mounted() {
    if (!this.notifications.length) {
      this.getMe()
      this.getNotifications()
    }
  },
  methods: {
    ...mapActions([
      'setInfoAlert',
      'showAlert',
      'hideAlert',
      'setNotifications',
      'logouted',
      'setCount',
      'loadding',
      'loadded',
      'setUser'
    ]),
    getNotifications() {
      axios.get('user-actions/notifications')
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
    logout() {
      localStorage.removeItem('token')
      this.logouted()
      this.$router.push({ name: 'login' })
    },
    openEditProfileDialog() {
      this.loadding()
      axios.get('auth/me')
        .then(response => {
          this.user_online = response.data.data
          this.loadded()
          this.editProfileDialog = !this.editProfileDialog
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.showAlert()
          this.loadded()
        })
    },
    getMe() {
      this.loadding()
      axios.get('auth/me')
        .then(response => {
          this.setUser(response.data.data)
          this.loadded()
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.showAlert()
          this.loadded()
        })
    },
    markReadAll() {
      axios.post('user-actions/mark-read-all')
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
a:hover {
  text-decoration: none;
}
</style>
