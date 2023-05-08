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

    <div class="content">
        <div class="body-row container">
          <div v-for="i in numRows" class="row">
            <div v-for="item in itemsInRow(i)" class="blog-item col-lg-4">
              <div class="blog-item-img">
                <img :src="item.url">
              </div>
              <div class="blog-item-content">
                <h3 class="blog-item-content--name">{{item.name}}</h3>
                <h5 class="blog-item-content--author">{{item.author}}</h5>
                <div class="blog-item-entry-content" v-html="item.content">
                </div>
                <router-link class="btn-read" :to="{name: 'read-more', params: { slug: item.slug }}">Read more</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import posts from "./Posts";

export default {
  name: "UserClient",
  data() {
    return {
      top_bar_left_items: [ { name: 'home', route: 'user_client' }, { name: 'about', route: 'user_client' }, { name: 'contact', route: 'user_client' }],
      top_bar_right_items: ['mdi-instagram', 'mdi-pinterest', 'mdi-youtube', 'mdi-google-plus', 'mdi-twitter', 'mdi-facebook'],
      navigation_items: [{ name: 'Home', route: 'user_client' }, { name: 'Sub Menu', route: 'user_client' }, { name: 'Travel', route: 'user_client' }, { name: 'Documentation', route: 'user_client' }],
      posts: [],
      numCols: 3,
    }
  },
  created() {
    this.getAllPosts()
  },
  computed:{
    numRows() {
      return Math.ceil(this.posts.length / 3)
    }
  },
  methods: {
    getAllPosts() {
      axios.get('/get-all-posts')
        .then(response => {
          this.posts = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    itemsInRow(row) {
      const startIndex = (row - 1) * 3;
      const endIndex = startIndex + 3;
      return this.posts.slice(startIndex, endIndex);
    },
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
  padding: 0 15px !important;
  max-width: 1230px;
  margin: 0 auto;
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
}
.center-header-logo {
  max-width: 260px;
  margin: auto;
}
.navigation-header {
  background-color: white;
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
.content {
  background-image: url("https://4.bp.blogspot.com/-Id9nW9tHwEc/Wg244YxHjlI/AAAAAAAABEo/soQpkzYubZMDy7M5KJg9vszfVSGrUOUogCK4BGAYYCw/s0/pattern.png");
  background-size: cover;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.blog-item {
  opacity: 0.9;
  padding: 24px 15px;
}
.blog-item:hover{
  box-shadow: 0 10px 15px ;
  transition: all 0.3s linear;
  opacity: 1;
}
.blog-item-img img{
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.blog-item-content {
  margin-top: 24px ;
  padding: 10px 20px;
  align-content: center;

}
.blog-item-content--name {
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  font-family: 'Comfortaa', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blog-item-content--name:hover {
  color: #EE5B32;
}
.blog-item-content--author {
  color: #8e8e95;
  line-height: 24px;
  font-weight: 400;
  font-size: 12px;
  font-family: "Open sans", sans-serif;
}
.blog-item-content--author::before {
  font-family: "Material Design Icons";
  content: '\F0013';
  padding-right: 4px;
}
.blog-item-entry-content {
  font-size: 14px;
  line-height: 24px;
  color: #8e8e95;
  padding-top: 10px;
  margin-bottom: 30px;
  font-family: "Open sans", sans-serif;
  height: 96px;
  overflow: hidden;
}
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-read {
  border: 1px solid #c4b2b2;
  color: #2f2f33;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 100rem;
  text-transform: uppercase;
}
.btn-read:hover {
  background-color: #EE5B32;
  color: white;
  border: #EE5B32 1px solid;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
