import axios from 'axios'

window.axios = axios
axios.defaults.baseURL = process.env.BASE_URL
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
export default {
  reloadConfigAxiosHeader() {
    axios.defaults.headers.common.Accept = 'application/json'
    axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
}
