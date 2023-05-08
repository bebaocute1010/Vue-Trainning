import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../components/Posts'
import Login from '../components/Auth/Login'
import SignUp from '../components/Auth/SignUp'
import Users from "../components/Admin/Users/index";
import Home from "../components/Home";
import UserClient from "../components/UserClient";
import Read from "../components/Post/Read";

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/',
      name: 'user_client',
      component:UserClient
    },
    {
      path: 'read',
      name: 'read-more',
      component: Read
    }
  ],
})

export default router
