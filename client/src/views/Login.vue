<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>

                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="input.username"></v-text-field>
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="input.password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Login",
    data() {
      return {
        input: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      login() {
        if (this.input.username !== "" && this.input.password !== "") {
          axios.post('http://localhost:8080/login', this.input)
          .then(response => {
            console.log(response.data);
            window.sessionStorage.jwt = response.data.token;
            this.$emit("authenticated", true);
            this.$router.replace({name: "home"});
          })
          .catch(function (err) {
            console.log("NO LOGIN")
            console.log(err)
          });
        } else {
          console.log("A username and password must be present");
        }
      }
    }
  }
</script>

<style scoped>

</style>