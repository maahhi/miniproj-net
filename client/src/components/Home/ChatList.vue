<template>
    <v-list>
        <v-list-tile
                v-for="item in contactList"
                :key="item._id"
                avatar
                :to="/chat/ + item._id"
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
  import { mapState } from 'vuex'
  export default {
    name: "ChatList",
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['contactList'])
    },
    mounted() {
      if (this.$store.state.contactList === null) {
        this.$store.dispatch('updateContacts')
      }
    }
  }
</script>

<style scoped>

</style>