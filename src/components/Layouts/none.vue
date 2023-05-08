<template>
  <main>
    <slot></slot>
    <v-overlay :value="isLoadding">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </main>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: "None",
  computed: {
    ...mapGetters([
      'isLoadding'
    ])
  },
}
</script>
