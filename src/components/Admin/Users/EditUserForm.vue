<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit user</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <input
                v-model="user.id"
                hidden
              />
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  required
                  v-model="user.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  outlined
                  row-height="4"
                  required
                  type="email"
                  v-model="user.email"
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
  name: "EditUserForm",
  props: {
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
    },
    show: false
  },
  data() {
    return {
      roles: [ 'Admin', 'User']
    }
  },
  methods: {
    onHideModal() {
      this.user.id = ''
      this.user.name = ''
      this.user.email = ''
      this.user.content = ''
      this.$emit('onHidden')
    },
    handleSubmit() {
      axios.post('/admin/updateUser', this.user)
        .then(response => {
          this.$emit('success', true, response.data.message)
          this.show = false;
        })
        .catch(error => {
          this.$emit('success', false, error.response.data.message)
          this.show = false;
        })
    }
  }
}
</script>

<style scoped>

</style>
