<template>
  <div class="container">

    <div class="content">
      <Alert :title="alert.title" :content="alert.content" :show="alert.isShowAlert" @hidden="hideAlert"></Alert>
      <h1>Sign Up</h1>
      <form @submit.prevent="onSubmit">
        <v-text-field
          v-model="form.email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.name"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.password_confirmation"
          label="Password Confirmation"
          type="password"
          required
        ></v-text-field>
        <v-btn
          class="mr-4"
          type="submit"
        >
          Sign Up
        </v-btn>
        <v-btn
          :to="{ name:'login' }"
        >Back</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from "../Alert/Alert"
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Alert
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'alert'
    ])
  },
  methods: {
    ...mapActions([
      'showAlert',
      'hideAlert',
      'setInfoAlert'
    ]),
    onSubmit(event) {
      axios.post('/auth/signup', this.form)
        .then(
            this.$router.push({name: 'login'})
        )
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_title,
            content: error.response.data.message
          })
          this.showAlert()
        })
    }
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
  font-weight: 700;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  max-width: 500px;
}

.content {
  border: 1px #eee solid;
  padding: 36px;
  box-shadow: #eee 8px 12px;
}
</style>
