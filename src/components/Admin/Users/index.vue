<template>
  <DefaultLayout>
    <div class="container">
      <EditUserForm :show="show" :user="user_edit" @onHidden="show = false" @success="reloadData"/>
      <Confirmation :title="alert.title" :show="show_confirm" :message="alert.content"
                    @resultConfirmation="resultConfirmation"/>
      <Alert :title="alert.title" :content="alert.content" :show="alert.isShowAlert" @hidden="hideAlert"></Alert>
      <CreateUsertForm :show="showCreateForm" @onHide="hideCreateForm" @success="reloadData"/>
      <div class="d-flex justify-content-between"
           style="margin: 16px 0"
      >
        <v-btn
          @click="setShowCreateForm"
        >Create user</v-btn>
        <v-btn
          color="error"
          @click="showDeleteConfirmation(-1)"
          v-if="selected.length > 0"
        >
          Delete selected
        </v-btn>
      </div>
      <v-card>
        <v-card-title>
          <v-select
            v-model="selectedRole"
            :items="roles"
            label="Filter by role"
            style="margin-left: 16px; max-width: 150px"
          ></v-select>
        </v-card-title>
        <v-data-table
          disable-sort
          show-select
          v-model="selected"
          :headers="columns"
          :items="filteredUsers"
          class="elevation-1"
        >
          <template v-slot:item.created_at="{ item }">
            <td>{{ formatDatetime(item.created_at) }}</td>
          </template>
          <template v-slot:item.updated_at="{ item }">
            <td>{{ formatDatetime(item.updated_at) }}</td>
          </template>
          <template v-slot:item.actions="{ item }">
            <td>
              <v-btn
                icon
                @click="getUser(item.id)">
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
      </v-card>
    </div>
  </DefaultLayout>
</template>

<script>
import Confirmation from "../../Alert/Confirmation";
import Alert from "../../Alert/Alert";
import {mapGetters, mapActions} from 'vuex'
import DefaultLayout from "../../Layouts/DefaultLayout";
import EditUserForm from "./EditUserForm";
import CreateUsertForm from "./CreateUserForm";

export default {
  name: "Users",
  components: {CreateUsertForm, Alert, DefaultLayout, EditUserForm, Confirmation},
  data() {
    return {
      search: '',
      selectedRole: '',
      show: false,
      show_confirm: false,
      showCreateForm: false,
      user_id_selected: '',
      user_edit: {
        id: '',
        name: '',
        email: '',
        role: ''
      },
      filter: {
        role: '',
      },
      columns: [
        {
          text: '#',
          value: 'index'
        }, {
          text: 'Name',
          value: 'name',
        }, {
          text: 'Email',
          value: 'email',
        }, {
          text: 'Role',
          value: 'role',
        }, {
          text: 'Created at',
          value: 'created_at',
        }, {
          text: 'Updated at',
          value: 'updated_at',
        }, {
          text: 'Actions',
          value: 'actions'
        },
      ],
      items: [],
      selected: [],
      roles: ['All', 'Admin', 'User']
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'alert',
    ]),
    filteredUsers() {
      let filteredUsers = this.items
      if (this.selectedRole === 'All') {
        filteredUsers = this.items
      }
      else if (this.selectedRole) {
        filteredUsers = filteredUsers.filter(user =>
          user.role.toLowerCase() === this.selectedRole.toLowerCase()
        )
      }
      return filteredUsers
    }
  },
  mounted() {
    if (this.user == null || this.user.role != 0) {
      this.$router.push({name: 'posts'})
    } else {
      this.getListUsers()

    }
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
      var ids = this.getIdsInSelected()
      if (!ids.includes(this.user.id)) {
        axios.post('/admin/delete-multiple-users', {selected: ids})
        .then(response => {
          this.getListUsers()
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
      } else {
        this.setInfoAlert({
          title: this.alert.default_error_title,
          content: "You can't delete your account !"
        })
        this.show_confirm = false
        this.showAlert()
      }
    },
    getIdsInSelected() {
      var ids = []
      this.selected.forEach((item) => {
        ids.push(item.id)
      });
      return ids
    },
    getUser(id) {
      this.showCreateForm = false
      this.loadding()
      axios.get(`/admin/getUser?id=${id}`)
        .then(response => {
          this.user_edit = response.data.data
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
    reloadData(updateSuccess, message) {
      this.show = false
      if (updateSuccess) {
        axios.get('/auth/me')
          .then(response => {
            this.setUser(response.data.data)
          })
          .catch(error => {
            this.setInfoAlert({
              title: this.alert.default_error_title,
              content: error.response.data.message
            })
            this.showAlert()
          })
        this.getListUsers()
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
      this.loadded()
    },
    getListUsers() {
      this.loadding()
      axios.get('admin/listUsers')
        .then(response => {
          this.items = response.data.data
          this.loadded()
        })
        .catch(error => {
          this.setInfoAlert({
            title: this.alert.default_error_title,
            content: error.response.data.message
          })
          this.loadded()
          this.showAlert()
        })
    },
    formatDatetime(datetime) {
      const options = {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'};
      return new Date(datetime).toLocaleString('ja-JP', options)
    },
    resultConfirmation(confirm) {
      if (confirm) {
        if (this.user_id_selected === -1) {
          this.deleteSelected()
        } else {
          if (this.user_id_selected === this.user.id) {
            this.setInfoAlert({
              title: this.alert.default_error_title,
              content: "You can't delete your account !"
            })
            this.show_confirm = false
            this.showAlert()
          } else {
            this.deleteUser(this.user_id_selected)
          }
        }
      } else {
        this.show_confirm = false
        this.user_id_selected = -1
      }
    },
    showDeleteConfirmation(id) {
      this.user_id_selected = id
      this.setInfoAlert({
        title: 'Are you sure ?',
        content: 'Do you really want to delete it'
      })
      this.show_confirm = true
    },
    deleteUser(id) {
      axios.get('/admin/deleteUser?id=' + id)
        .then(response => {
          this.getListUsers()
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
