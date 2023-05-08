<template>
  <div>
    <div class="head-main">
      <div class="top-bar">
        <div class="container d-flex">
          <b-list-group horizontal="md">
            <b-list-group-item class="list-group-item-left" v-for="(item, index) in top_bar_left_items" :key="index">
              <router-link class="list-group-item-left--text" :to="{name: item.route}">{{ item.name }}</router-link>
            </b-list-group-item>
          </b-list-group>

          <v-spacer/>
          <b-list-group horizontal="md">
            <b-list-group-item class="list-group-item-right" v-for="(item, index) in top_bar_right_items" :key="index">
              <a href="#"><v-icon class="list-group-item-right-icon">{{ item }}</v-icon></a>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>

      <div class="center-header">
        <div class="container">
          <div class="d-flex justify-content-center body-row">
            <img class="center-header-logo" src="//2.bp.blogspot.com/-P8CIO5tD4b0/Wg3sxcuhyzI/AAAAAAAABE8/wGmXK1i7_Y82VtJUb3-YL10edOw2Lso4QCK4BGAYYCw/s1600/logo.png">
          </div>
        </div>
      </div>

      <div class="navigation-header">
        <div class="container d-flex justify-content-center">
          <b-list-group horizontal="md">
            <b-list-group-item class="list-group-item-navigation" v-for="(item, index) in navigation_items" :key="index">
              <router-link class="list-group-item-navigation--text" :to="{name: item.route}">{{ item.name }}</router-link>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
    <div class="content" v-if="post">
      <div class="body-row content-container">
        <img class="center-header-logo"
             :src="post.url">
        <br>
        <div v-html="post.content"></div>
        <div class="entry-content">
          <h5 class="author-name">
            Author:
            <span>{{post.author}}</span>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Read",
  data() {
    return {
      top_bar_left_items: [ { name: 'home', route: 'user_client' }, { name: 'about', route: 'user_client' }, { name: 'contact', route: 'user_client' }],
      top_bar_right_items: ['mdi-instagram', 'mdi-pinterest', 'mdi-youtube', 'mdi-google-plus', 'mdi-twitter', 'mdi-facebook'],
      navigation_items: [{ name: 'Home', route: 'user_client' }, { name: 'Sub Menu', route: 'user_client' }, { name: 'Travel', route: 'user_client' }, { name: 'Documentation', route: 'user_client' }],
      post: null,
    }
  },
  created() {
    this.getPost()
  },
  methods: {
    getPost() {
      console.log('ccc')
      if (!this.$route.params ||!this.$route.params) {
        this.post = null
        console.log(123123)
        return
      }
      else {
        console.log(6456)
      }
      axios.get('/get-post-by-slug?slug=' + this.$route.params.slug)
        .then(response => {
          this.post = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&family=Open+Sans&display=swap');
a {
  text-decoration: none;
}
.head-main {
  background-image: linear-gradient(90deg,#EE5B32,#FB7928,#EE5B32);
}
.container {
  padding: 0;
}
.top-bar {
}
.list-group-item {
  border: 0;
  background-color: rgba(0,0,0,0);
  color: white;
}
.list-group-item-right-icon {
  color: white;
}
.list-group-item-right-icon:hover {
  color: #e4405f;
}
.list-group-item-left {
  padding: 0 25px 0 0;
}
.list-group-item-left--text {
  color: white;
  font-family: 'Comfortaa', sans-serif;
  line-height: 40px;
  font-size: 12px;
  font-weight: 400;
  text-transform: capitalize;
}
.list-group-item-left--text:hover {
  color: #e4405f;
}
.list-group-item-right {
  padding: 0 8px;
  line-height: 40px;
}
.center-header {
}
.body-row {
  padding: 30px 0;
}
.body-row .row {
  margin-bottom: 16px;
}
.center-header-logo {
  max-width: 260px;
  margin: auto;
}
.navigation-header {
  background-color: white;
  border-bottom: 1px solid #eee;
}
.list-group-item-navigation {
  background-color: white;
  display: inline-block;
  margin: 0;
  padding: 0 12px;
}
.list-group-item-navigation--text {
  font-family: 'Comfortaa', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  color: #2f2f33;
  font-size: 14px;
  font-weight: 600;
  line-height: 60px;
}
.list-group-item-navigation--text:hover {
  color: #EE5B32;
}
.content-container {
  padding: 20px 0 40px;
  max-width: 1000px;
  margin: 0 auto;
}
.content-container img {
  max-width: 100%;
}
.author-name {
  font-family: 'Comfortaa', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #2f2f33;
  text-transform: capitalize;
  color: #EE5B32;
}
</style>
