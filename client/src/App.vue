<template>
  <transition name="slide-left">
  <router-view @authenticated="$store.dispatch('createWS')"></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        socket: null
      }
    },
    methods: {
      sseHandler(data) {
        let parsedData = JSON.parse(data)
        console.log(parsedData)
        this.$router.push({ name: 'Chat', params: {id: parsedData.peer, invited: true, room: parsedData.room_id }});
        this.$emit('invited', data.room_id);
      },
      createSSE() {
        let es = new EventSource("http://localhost:8080/sse/"+ this.$store.state.me.id);
        es.onopen = () => {
          this.$store.commit('SET_CONNECTED', true);
          console.log("open shit!")
        };
        es.onerror = () => {
          this.$store.commit('SET_CONNECTED', false);
          console.log("Damn mf js!")
        };

        es.onmessage = (event) => {
          if (event.id === "CLOSE") {
            es.close();
          }
          else this.sseHandler(event.data)
        }
      },
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
