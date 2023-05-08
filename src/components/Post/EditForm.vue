<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <input
                v-model="post.id"
                hidden
              />
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  required
                  v-model="post.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <label>Content</label>
                <ckeditor v-model="post.content"></ckeditor>
              </v-col>
              <v-col cols="6">
                <v-file-input
                  v-model="image"
                  label="Choose a image"
                  accept="image/*"
                  @change="onFileChange"
                ></v-file-input>
              </v-col>

              <v-col cols="6" v-if="file || url_image">
                <v-card hover>
                  <v-img class="image-preview" :src="file || url_image"/>
                </v-card>
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

import CKEditor from "ckeditor4-vue";

export default {
  data() {
    return {
      updateSuccess: false,
      file: null,
    }
  },
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    post: {
      id: '',
      name: '',
      content: '',
    },
    url_image: '',
    image: null,
    show: false
  },
  methods: {
    onFileChange(e) {
      this.file = e ? URL.createObjectURL(e) : null
      console.log(e)
    },
    onHideModal() {
      this.show = false
      this.post.id = ''
      this.post.name = ''
      this.post.content = ''
      this.post.url_image = ''
      this.file = null
      this.image = null
      this.$emit('success', false, false)
    },
    handleSubmit() {
      var form_data = this.getFormData(this.post)
      if(this.image){
        form_data.append('image', this.image)
      }
      axios.post('/post/update', form_data)
        .then(response => {
          this.$emit('success', true, response.data.message)
          this.show = false;
        })
        .catch(error => {
          this.$emit('success', false, error.response.data.message)
          this.show = false;
        })
      this.onHideModal()
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
.image-preview {

}
</style>
