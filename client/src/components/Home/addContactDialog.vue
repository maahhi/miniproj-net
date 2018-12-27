<template>
    <div class="text-xs-center">
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <v-btn
                    absolute
                    dark
                    fab
                    buttom
                    right
                    color="pink"
                    slot="activator"
            >
                <v-icon>add</v-icon>
            </v-btn>
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                    Privacy Policy
                </v-card-title>

                <v-card-text>
                    <v-text-field name="contactUser" type="text"></v-text-field>
                    HIII
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            flat
                            @click="dialog = false"
                    >
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  export default {
    name: "addContactDialog",
    data: function () {
      return {
        dialog: false
      }
    },
    methods: {
      addContact() {

      }
    }
  }
</script>

<style scoped>

</style>