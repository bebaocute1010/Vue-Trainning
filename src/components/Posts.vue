<template>
  <DefaultLayout>
    <div class="container">
      <EditForm :post="post" :url_image="post.url_image" :show="show" @success="reloadData"></EditForm>
      <Confirmation :title="alert.title" :show="show_confirm" :message="alert.content"
                    @resultConfirmation="resultConfirmation"></Confirmation>
      <Alert :title="alert.title" :content="alert.content" :show="alert.isShowAlert" @hidden="hideAlert"></Alert>
      <CreateForm :show="showCreateForm" @onHide="hideCreateForm" @success="createSuccess"></CreateForm>
      <div class="d-flex justify-content-between"
           style="margin: 16px 0"
      >
        <v-btn
          @click="setShowCreateForm"
        >Create post
        </v-btn>
        <v-btn
        color="error"
        @click="showDeleteConfirmation(-1)"
        v-if="selected.length > 0"
      >
        Delete selected
      </v-btn>
      </div>
      <v-data-table
        disable-sort
        show-select
        v-model="selected"
        :headers="columns"
        :items="items"
        class="elevation-1"
        calculate-widths
      >
        <template v-slot:item.image="{ item }">
          <v-img :src="item.url" width="100" height="100"/>
        </template>

        <template v-slot:item.created_at="{ item }">
          <td>{{ formatDatetime(item.created_at) }}</td>
        </template>
        <template v-slot:item.updated_at="{ item }">
          <td>{{ formatDatetime(item.updated_at) }}</td>
        </template>
        <template v-slot:item.actions="{ item }">
          <td>
            <v-btn icon
            >
              <router-link style="color: black" :to="{name: 'read-more', params: { slug: item.slug }}"><v-icon>mdi-eye-outline</v-icon></router-link>
            </v-btn>
            <v-btn
              icon
              @click="getPost(item.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="showDeleteConfirmation(item.id)">
              <v-icon color="red">mdi-trash-can-outline</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>

    </div>
  </DefaultLayout>
</template>

<script>
import EditForm from "./Post/EditForm";
import Confirmation from './Alert/Confirmation'
import Alert from "./Alert/Alert";
import CreateForm from "./Post/CreateForm";
import {mapGetters, mapActions} from 'vuex'
import DefaultLayout from "./Layouts/DefaultLayout";

export default {
  components: {Confirmation, EditForm, Alert, CreateForm, DefaultLayout},
  computed: {
    ...mapGetters([
      'count',
      'user',
      'alert',
      'isLoadding'
    ])
  },
  data() {
    return {
      show: false,
      showCreateForm: false,
      show_confirm: false,
      post_id_selected: '',
      post: {
        id: '',
        name: '',
        content: '',
        url_image: ''
      },
      columns: [
        {
          text: '#',
          value: 'index',
          width: 60,
        }, {
          text: 'Name',
          value: 'name',
        }, {
          text: 'Image',
          value: 'image'
        }, {
          text: 'Created at',
          value: 'created_at',
        }, {
          text: 'Updated at',
          value: 'updated_at',
        }, {
          text: 'Actions',
          value: 'actions',
        },
      ],
      items: [],
      selected: [],
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem('token')) {
      next({name: 'login'})
    } else {
      next()
    }
  },
  created() {
    this.loginned()
  },
  mounted() {
    this.getAllPosts()
  },
  methods: {
    ...mapActions([
      'counter',
      'setUser',
      'loginned',
      'logouted',
      'setInfoAlert',
      'showAlert',
      'hideAlert',
      'loadding',
      'loadded'
    ]),
    deleteSelected() {
      axios.post('/post/delete-multiple', {selected: this.getIdsInSelected()})
        .then(response => {
          this.getAllPosts()
          this.setInfoAlert({
            title: this.alert.default_title,
            content: response.data.message
          })
          this.show_confirm = false
          this.showAlert()
        })
        .catch(error => {
          this.getAllPosts()
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.show_confirm = false
          this.showAlert()
        })
    },
    getIdsInSelected() {
       var ids = []
      this.selected.forEach((item) => {
        ids.push(item.id)
      });
       return ids
    }
    ,reloadData(updateSuccess, message) {
      this.show = false
      if (updateSuccess) {
        this.getAllPosts()
        this.setInfoAlert({
          title: this.alert.default_title,
          content: message
        })
        this.showAlert()
      } else if (message) {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: message
          })
          this.showAlert()
        }
      this.loadded()
    },
    resultConfirmation(confirm) {
      if (confirm) {
        if (this.post_id_selected === -1) {
          this.deleteSelected()
        } else {
          this.deletePost(this.post_id_selected)
        }
      } else {
        this.show_confirm = false
        this.user_id_selected = -1
      }
    },
    getAllPosts() {
      this.loadding()
      sessionStorage.clear()
      axios.get('post/get-posts')
        .then(response => {
          this.items = response.data.data
          this.loadded()
        })
        .catch(error => {
          if (error.response.status == 401) {
            localStorage.removeItem('token')
            this.setInfoAlert({
              title: this.alert.default_error_title,
              content: error.response.data.message
            })
            this.showAlert()
            this.$router.push({name: 'login'})
          }
        })
    },
    getPost(id) {
      this.loadding()
      axios.get(`post/get?id=${id}`)
        .then(response => {
          this.post = response.data.data
          this.show = true
          this.loadded()
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.showAlert()
          this.loadded()
          if (error.response.status == 401) {
            this.$router.push({name: 'login'})
          }
        })
    },
    showDeleteConfirmation(id) {
      this.post_id_selected = id
      this.setInfoAlert({
        title: 'Are you sure ?',
        content: 'Do you really want to delete it'
      })
      this.show_confirm = true
    },
    deletePost(id) {
      axios.get('post/delete?id=' + id)
        .then(response => {
          this.getAllPosts()
          this.setInfoAlert({
            title: this.alert.default_title,
            content: response.data.message
          })
          this.show_confirm = false
          this.showAlert()
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.show_confirm = false
          this.showAlert()
        })
    },
    createSuccess(success, message) {
      if (success) {
        this.getAllPosts()
        this.setInfoAlert({
          title: this.alert.default_title,
          content: message
        })
        this.showAlert()
      } else {
        this.setInfoAlert({
          title: this.alert.default_error_title,
          content: message
        })
        this.showAlert()
      }
    },
    formatDatetime(datetime) {
      const options = {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'};
      return new Date(datetime).toLocaleString('ja-JP', options)
    },
    setShowCreateForm() {
      this.showCreateForm = true
    },
    hideCreateForm() {
      this.showCreateForm = false
    }
  }
}

</script>

<style scoped>
</style>
