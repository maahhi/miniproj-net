<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username"/>
        <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        <button type="button" v-on:click="login()">Login</button>
    </div>
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
            this.$parent.jwt = response.data.token;
            this.$emit("authenticated", true);
            this.$router.replace({name: "home"});
          })
          .catch(function (err) {
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