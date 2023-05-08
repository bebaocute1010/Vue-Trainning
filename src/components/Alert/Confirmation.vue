<template>
    <v-row justify="center">
      <v-dialog
        v-model="show"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{title}}
          </v-card-title>
          <v-card-text>{{message}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="resultConfirm(false)"
            >
              Disagree
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="resultConfirm(true)"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
export default {
  name: "Confirmation",
  props: {
    title: '',
    message: '',
    show: false
  },
  methods: {
    resultConfirm(confirm) {
      this.$emit('resultConfirmation', confirm)
    }
  }
}
</script>

<style scoped>

</style>
