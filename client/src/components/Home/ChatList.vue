<template>
    <v-list two-line>
        <v-list-tile
                v-for="item in contactList"
                :key="item._id"
                avatar
                :to="{ name: 'Chat', params: {id: item._id}}"
        >
            <v-list-tile-avatar color="red" class="align-center">
                <span class="white--text headline">{{item.username.charAt(0)}}</span>
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title v-html="item.username"></v-list-tile-title>
                <v-list-tile-sub-title v-html="lastMessageByID(item._id)"></v-list-tile-sub-title>
            </v-list-tile-content>

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
      ...mapState(['contactList']),
      lastMessageByID: function () {
        return this.$store.getters.lastMessageByID
      }
    },
    mounted() {
      this.$store.dispatch('updateContacts')
    }
  }
</script>

<style scoped>

</style>