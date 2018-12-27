<template>
    <v-app>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="indigo" dark>
                        <v-toolbar-side-icon></v-toolbar-side-icon>

                        <v-toolbar-title>Inbox</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <chat-list></chat-list>
                </v-card>
                <v-container fluid grid-list-md></v-container>
                <v-btn
                        absolute
                        dark
                        fab
                        buttom
                        right
                        color="pink"
                        @click="$router.push('/addContact')"
                >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
    import ChatList from '../components/Home/ChatList'
  export default {
    name: "Home",
    components: {
      "chat-list": ChatList,
    }
  }
</script>

<style scoped>

</style>