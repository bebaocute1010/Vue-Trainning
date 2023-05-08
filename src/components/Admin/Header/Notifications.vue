<template>
  <v-menu offset-y max-width="250px">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-bell-outline</v-icon>
        <v-badge v-if="count > 0" color="red" :content="count" overlap />
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-btn block outlined @click="markReadAll" v-if="notifications.length > 0">
          Mark as read all
          <v-icon>mdi-close-circle-outline </v-icon>
        </v-btn>
        <v-list-item-title v-else>Not notification</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="notification in notifications">
        <v-list-item-title class="notification unread" v-if="!notification.read_at">
          <span class="post-username">{{ notification.data.post_user_name }}</span> created post "{{notification.data.post_name}}"
        </v-list-item-title>
        <v-list-item-title class="notification read" v-if="notification.read_at">
          <span class="post-username">{{ notification.data.post_user_name }}</span> created post "{{notification.data.post_name}}"
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Notifies",
  computed: {
    ...mapGetters([
      'notifications',
      'count'
    ])
  },
  methods: {
    markReadAll() {
      this.$emit('markReadAll')
    }
  }
}
</script>

<style scoped>
.notification {
  font-size: 12px;
}

.unread {
  font-weight: 600;
  color: black;
}

.read {
  color: slategrey;
}

.post-username {
  font-size: 14px;
  font-weight: 600;
}
</style>
