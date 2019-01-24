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
                            {{ PeerName }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="$router.push({ name: 'Call', params: { id: PeerID, isCaller: true} })">
                            <v-icon>call</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer" >
                        <message :messages="messages" @imageLoad="scrollToEnd"></message>
                    </div>
                    <div class="typer">
                        <input type="text" placeholder="Type here..." v-on:keyup.enter="sendMessage" v-model="content">
                        <v-btn icon class="blue--text emoji-panel" @click="toggleEmojiPanel">
                            <v-icon>mood</v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
  import Message from '../components/Chat/Message'
  export default {
    name: "Chat",
    components: {
      'message': Message,
    },
    data: function () {
      return {
        content: ""
      }
    },
    computed: {
      messages: function() {
        return this.$store.getters.messagesByID(this.$route.params.id)
      },
      socket() {
        return this.$store.state.socket
      },
      PeerID() {
        return this.$route.params.id
      },
      PeerName() {
        let peer =  this.$store.getters.contactByID(this.$route.params.id);
        if (!peer)
          return "UNKNOWN"
        else
        {
          if (peer.display_name)
            return peer.display_name;
          else return peer.username
        }

      }
    },
    methods: {
      toggleEmojiPanel () {
        this.emojiPanel = !this.emojiPanel
      },
      onScroll () {

      },
      scrollToEnd () {

      },
      sendMessage () {
        console.log("z")
        if (this.content !== '') {
          this.$store.dispatch('sendMessage', { content: this.content, receiver_id: this.PeerID });
          // this.$store.dispatch('sendMessage', { username: this.username, content: this.content, date: new Date().toString(), chatID: this.id })
          this.content = ''
        }
      },
    }
  }
</script>

<style scoped>
    .scrollable {
        overflow-y: auto;
        height: 90vh;
    }
    .typer{
        box-sizing: border-box;
        display: flex;
        align-items: center;
        bottom: 0;
        height: 4.9rem;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
    }
    .typer .emoji-panel{
        /*margin-right: 15px;*/
    }
    .typer input[type=text]{
        position: absolute;
        left: 2.5rem;
        padding: 1rem;
        width: 80%;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 1.25rem;
    }
    .chat-container{
        box-sizing: border-box;
        height: calc(100vh - 9rem);
        overflow-y: auto;
        padding: 10px;
        background-color: #f2f2f2;
    }

</style>