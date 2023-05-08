<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-if="user"
                  label="Name"
                  required
                  v-model="user.name"
                ></v-text-field>
                <v-text-field
                  v-if="user"
                  v-model="user.email"
                  disabled
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="6" align="center">
                <v-img width="100" height="100" :src="file ? previewUrl : (user ? user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')"></v-img>
                <v-file-input label="Choose image" v-model="file" accept="image/*" @change="preview"></v-file-input>
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
  name: "EditProfile",
  data() {
    return {
      file: null,
      previewUrl: null,
    }
  },
  props: {
    dialog: false,
    user: null
  },
  computed: {
    ...mapGetters([
      'alert'
    ])
  },
  methods: {
    ...mapActions([
      'loadding',
      'loadded',
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
      this.loadding()
      var form_data = new FormData()
      form_data.append('id', this.user.id)
      form_data.append('name', this.user.name)
      if (this.file) {
        form_data.append('avatar', this.file)
      }
      axios.post('user-actions/update-profile', form_data)
        .then(response => {
          this.loadded()
          this.$emit('refreshUser')
          this.closeDialog()
          this.setInfoAlert({
            title: this.alert.default_title,
            content: response.data.message
          })
          this.showAlert()
        })
        .catch(error => {
          this.closeDialog()
          this.loadded()
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
