<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Change password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="form.password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="New password"
                  type="password"
                  v-model="form.new_password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="New password confirmation"
                  type="password"
                  v-model="form.new_password_confirmation"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitForm"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "ChangePassword",
  data() {
    return {
      file: null,
      previewUrl: null,
      form: {
        password: '',
        new_password: '',
        new_password_confirmation: ''
      }
    }
  },
  props: {
    dialog: false,
  },
  computed: {
    ...mapGetters([
      'alert'
    ])
  },
  methods: {
    ...mapActions([
      'setInfoAlert',
      'showAlert'
    ]),
    closeDialog() {
      this.$emit('closeDialog')
    },
    preview() {
      if (this.file) {
        this.previewUrl = URL.createObjectURL(this.file);
      }
    },
    submitForm() {
      axios.post('auth/change-password', this.form)
        .then(response => {
          this.setInfoAlert({
            title: this.alert.default_title,
            content: response.data.message
          })
          this.showAlert()
          this.closeDialog()
        })
        .catch(error => {
          this.setInfoAlert({
          title: this.alert.default_error_title,
          content: error.response.data.message
        })
          this.showAlert()
          this.closeDialog()
        })
    }
  }
}
</script>

<style scoped>

</style>
