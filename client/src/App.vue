<template>
  <router-view @authenticated="createSSE"></router-view>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
    }
  },
  methods: {
    sseHandler(data) {
      console.log(data)
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
