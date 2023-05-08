<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Name"
                  required
                  outlined
                  v-model="post.name"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="slug"
                  outlined
                  readonly
                  v-model="slug"
                >

                </v-text-field>
              </v-col>
              <v-col cols="12">
                <label>Content</label>
                <ckeditor v-model="post.content"></ckeditor>
              </v-col>

              <v-col cols="4">
                <v-file-input
                  v-model="post.image"
                  label="Choose a image"
                  accept="image/*"
                  @change="onFileChange"
                ></v-file-input>
              </v-col>
              <v-col cols="4">
                <v-img height="150" width="150" :src="file"/>
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
import {mapGetters} from "vuex";
import CKEditor from "ckeditor4-vue";
import axios from "axios";

export default {
  name: "CreateForm",
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      post: {
        user_id: '',
        name: '',
        content: '',
        image: null
      },
      file: null,
      hover: false,
    }
  },
  props: {
    show: false,
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    slug() {
      return this.post.name.replaceAll(' ', '-')
    }
  },
  methods: {
    onHideModal() {
      this.show = false
      this.post.name = ''
      this.post.content = ''
      this.post.user_id = ''
      this.post.image = null
      this.file = null
      this.$emit('onHide')
    },
    handleSubmit() {
      this.post.user_id = this.user.id
      var form_data = this.getFormData(this.post)
      form_data.append('slug', this.slug)
      axios.post('/post/create', form_data)
        .then(response => {
          this.$emit('success', true, response.data.message)
        })
        .catch(error => {
          this.$emit('success', false, error.response.data.message)
        })
      this.onHideModal()
    },
    resetInput() {
      this.post.name = ''
      this.post.content = ''
    },
    onFileChange(e) {
        this.file = e ? URL.createObjectURL(e) : null
    },
    getFormData(object) {
      const formData = new FormData();
      Object.keys(object).forEach(key => formData.append(key, object[key]));
      return formData;
    }
  }
}
</script>

<style scoped>

</style>
