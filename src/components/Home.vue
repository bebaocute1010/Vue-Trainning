<template>
  <v-app>
    <v-app-bar app>
      <!-- -->
      <v-spacer/>
    <v-btn
      icon
    >
      <v-icon>
        mdi-account
      </v-icon>
    </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>
