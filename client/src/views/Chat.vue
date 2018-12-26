<template>
    <v-app>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="indigo" dark>
                        <v-toolbar-side-icon></v-toolbar-side-icon>

                        <v-toolbar-title>{{ $route.params.id }}</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <p>
                        it's chat page
                    </p>
                </v-card>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
  export default {
    name: "Chat"
  }
</script>

<style scoped>

</style>