<template>
    <v-app>
        <v-layout row>
            <v-flex xs12 sm10 order-xs2 style="position: relative;">
                <v-card>
                    <v-toolbar color="indigo dark">
                        <v-btn icon @click="$router.go(-1)">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title>
                            {{ $route.params.id}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-form @submit.prevent="addContact">
                        <v-text-field
                                label="Username"
                                hint="enter username of your friend to add"
                                persistent-hint
                                required
                                v-model="form.newContact"
                        ></v-text-field>
                        <v-btn type="submit" color="primary">ADD</v-btn>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
  export default {
    name: "addContact",
    data: function() {
      return {
        form: {
          newContact: ""
        },
        err: false
      }
    },
    methods: {
      addContact() {
        this.$http.post('/addContact', this.form)
        .then(response => {
          console.log(response)
          this.$store.dispatch('updateContacts');
          this.$router.go(-1)
        })
        .catch(err => {
          this.err = err.message
        })
      }
    }
  }
</script>

<style scoped>

</style>