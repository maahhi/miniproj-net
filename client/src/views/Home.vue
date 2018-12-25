<template>
    <div class="home">
        IT's HOME!!!

        <p v-for="item in contactList" :key="item._id">{{item}}</p>
    </div>
</template>

<script>
    import axios from 'axios'
  export default {
    name: "Home",
    data() {
      return {
        contactList: []
      }
    },

    mounted() {
      axios.get('http://localhost:8080/contact', {
        headers: { "Authorization": 'Bearer ' + window.sessionStorage.jwt }
      })
      .then( response => {
        this.contactList = response.data
      })
    }
  }
</script>

<style scoped>

</style>