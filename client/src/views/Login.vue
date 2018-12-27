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
                            <v-alert
                                    :value="!valid"
                                    type="warning"
                                    transition="scale-transition"
                            >
                                Username or Password is empty.
                            </v-alert>
                            <v-alert
                                    :value="error"
                                    type="error"
                            >
                                {{ error }}
                            </v-alert>
                            <v-form @submit.prevent="login">
                                <v-card-text>
                                        <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="input.username"></v-text-field>
                                        <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="input.password"></v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn type="submit" color="primary">Login</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        input: {
          username: "",
          password: ""
        },
        valid: true,
        error: ""
      }
    },
    methods: {
      login() {
        this.valid = true;
        if (this.input.username !== "" && this.input.password !== "") {
          this.$http.post('/login', this.input)
          .then(response => {
            console.log(response.data);
            window.sessionStorage.jwt = response.data.token;
            this.$store.commit("SET_USER", response.data.user)
            this.$emit("authenticated", true);
            this.$router.replace({name: "home"});
          })
          .catch(err => {
            this.error = err.message;
          });
        } else {
          this.valid = false
        }
      }
    }
  }
</script>

<style scoped>

</style>