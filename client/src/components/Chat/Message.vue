<template>
    <div>
        <div class="message" v-for="(message,index) in messages" :key=index :class="{own: nameByID(message) === username}">
            <div class="username" v-if="index>0 && messages[index-1].receiver_id != message.receiver_id">{{nameByID(message)}}</div>
            <div class="username" v-if="index == 0">{{nameByID(message)}}</div>
            <div style="margin-top: 5px"></div>
            <div class="content">
                <div v-html="message.content"></div>
                <chat-image v-if="message.image" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Message",
    props: [
      'messages'
    ],
    computed: {
      username: function () {
        return this.$store.state.me.username
      }
    },
    methods: {
       nameByID(message) {
        if (message.sender_id) {
          let contact = this.$store.getters.contactByID(message.sender_id)
          if (contact.display_name) {
            return contact.display_name
          }
          else return contact.username
        }
        else {
          return this.$store.state.me.username
        }
      },
      imageLoad () {
        // this.$emit('imageLoad')
      }
    },
  }
</script>

<style scoped>
    .message{
        margin-bottom: 3px;
    }
    .message.own{
        text-align: right;
    }
    .message.own .content{
        background-color: lightskyblue;
    }
    .chat-container .username{
        font-size: 18px;
        font-weight: bold;
    }
    .chat-container .content{
        padding: 8px;
        background-color: lightgreen;
        border-radius: 10px;
        display:inline-block;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
        max-width: 50%;
        word-wrap: break-word;
    }
    @media (max-width: 480px) {
        .chat-container .content{
            max-width: 60%;
        }
    }
</style>