<template>
  <None>
  <div class="container">
    <div class="content">
      <Alert :title="alert.title" :content="alert.content" :show="alert.isShowAlert" @hidden="hideAlert"></Alert>
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <v-text-field
          v-model="form.email"
          label="E-mail"
          required
          aria-autocomplete="none"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
          aria-autocomplete="none"
        ></v-text-field>
        <v-btn
          class="mr-4"
          type="submit"
        >
          Login
        </v-btn>
        <v-btn
          :to="{ name:'signup' }"
        >Sign Up</v-btn>
      </form>
    </div>
  </div>
  </None>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import mixins from "../../../Mixins/mixins";
import { mapActions, mapGetters } from "vuex";
import Alert from "../Alert/Alert";
import ApiService from "../../Services/ApiService";
import None from "../Layouts/none";

export default {
  components: { Alert,None },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      },
      v$: useVuelidate(this.rules, this.form),
    }
  },
  computed: {
    ...mapGetters([
      'alert',
    ]),
    // emailErrors () {
    //   const errors = []
    //   if (!this.$v.email.$dirty) return errors
    //   !this.$v.email.email && errors.push('Must be valid e-mail')
    //   !this.$v.email.required && errors.push('E-mail is required')
    //   return errors
    // },
    // passwordError () {
    //   const errors = []
    //   if (!this.$v.password.$dirty) return errors
    //   !this.$v.password.required && errors.push('Password is required')
    //   !this.$v.password.minLength && errors.push('Minimum 6 char')
    //   return errors
    // }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('token')) {
      next({ name: 'posts' })
    }
    else {
      next()
    }
  },
  created() {
    mixins.methods.log()
  },
  methods: {
    ...mapActions([
      'loginned',
      'showAlert',
      'hideAlert',
      'setInfoAlert',
      'loadding',
      'loadded'
    ]),
    onSubmit() {
      this.loadding()
      axios.post('/login', this.form)
        .then(response => {
            localStorage.setItem('token', response.data.access_token)
            ApiService.reloadConfigAxiosHeader()
            this.loginned()
            this.loadded()
            this.$router.push({name: 'posts'})
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.showAlert()
          this.loadded()
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
