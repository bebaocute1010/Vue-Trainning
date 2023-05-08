<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Create user</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  required
                  outlined
                  v-model="user.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  outlined
                  required
                  type="email"
                  v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  outlined
                  required
                  type="password"
                  v-model="user.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  hide-selected
                  outlined
                  label="Role"
                  :items="roles"
                  v-model="user.role"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="onHideModal"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="handleSubmit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "CreateUserForm",
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role: 'User'
      },
      roles: [ 'Admin', 'User']
    }
  },
  props: {
    show: false
  },
  methods: {
    onHideModal() {
      this.show = false
      this.user.name = ''
      this.user.email = ''
      this.user.password = ''
      this.$emit('onHide')
    },
    handleSubmit() {
      axios.post('admin/createUser', this.user)
        .then(response => {
          this.$emit('success', true, response.data.message)
          this.show = false;
        })
        .catch(error => {
          this.$emit('success', false, error.response.data.message)
          this.show = false;
        })
      this.onHideModal()
    }
  }
}
</script>

<style scoped>

</style>
