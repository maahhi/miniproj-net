<template>
    <v-list>
        <v-list-tile
                v-for="item in contactList"
                :key="item._id"
                avatar
                @click="openChat"
        >
            <v-list-tile-action>
                <v-icon v-if="item.icon" color="pink">star</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title v-text="item.username"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
                <img :src="item.avatar">
            </v-list-tile-avatar>
        </v-list-tile>
    </v-list>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        contactList: []
      }
    },
    methods: {
      openChat: function (event) {
        console.log("CLICK IN CONTACT");
        console.log(event);
        this.$router.push('/chat')
      }
    },
    mounted() {
      this.$http.get('http://localhost:8080/contact', {
        headers: {"Authorization": 'Bearer ' + window.sessionStorage.jwt}
      })
      .then(response => {
        console.log(response.data)
        this.contactList = response.data
      })
    }
  }
</script>

<style scoped>

</style>