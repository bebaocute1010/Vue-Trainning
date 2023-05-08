<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="400"
        no-click-animation
        @click:outside="onHidden"
        @keydown="onHidden"
        v-model="show"
      >
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
              class="font-weight-bold"
            >{{ title }}
            </v-toolbar>
            <v-card-text>
              <p class="text-h7 pa-12">{{ content }}</p>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="onHidden"
              >Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Notify",
  props: {
    title: '',
    content: '',
    show: false
  },
  methods: {
    onHidden() {
      this.$emit('hidden')
    }
  }
}
</script>

<style scoped>

</style>
