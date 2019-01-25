<template>
    <v-layout justify-center>
        <v-flex xs12 sm6>
            <v-toolbar color="indigo" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>Discover</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card>
                <v-container
                        fluid
                        grid-list-md
                >
                    <v-layout row wrap>
                        <v-flex>
                            <v-card>
                                <div id="remote">
                                    <h2>Remote</h2>
                                    <video playsinline autoplay muted></video>
                                    <!--<h2>Offer SDP</h2>-->
                                    <!--<textarea v-model="answerSdpTextarea"></textarea>-->
                                    <br>
                                    <br>
                                </div>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card>
                                <div id="local">
                                    <h2>Local</h2>
                                    <video playsinline autoplay muted></video>
                                    <!--<h2>Offer SDP</h2>-->
                                    <!--<textarea v-model="offerSdpTextarea"></textarea>-->
                                    <br>
                                    <br>
                                </div>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  const Peer = require('simple-peer');
  export default {
    name: "Call",
    props: [
      'id',
      'isCaller'
    ],
    data: function() {
      return {
        localVideo: null,
        remoteVideo: null,
        peerConnection: null
      }
    },
    mounted() {
      this.localVideo = document.querySelector('div#local video');
      this.remoteVideo = document.querySelector('div#remote video');

      this.$store.state.socket.on("signal", (data) => {
        this.peerConnection.signal(data.signalData)
      });

      if (this.isCaller) {
        console.log("it's Caller");
        this.$store.state.socket.emit("call", { peer: this.id});
        this.$store.state.socket.on("callAccept", this.createPeerConnection)
      }
      else {
        console.log("it's Callee");
        this.createPeerConnection()
      }
      
    },
    methods: {
      createPeerConnection(){
        console.log("CallAccept Received");
        navigator.mediaDevices.getUserMedia({"video": true})
        .then((stream) => {
          this.peerConnection = new Peer({ initiator: this.isCaller, stream:stream })
        })
        .then(()=> {
          this.peerConnection.on('signal', (data) => {
            console.log(data)
            this.$store.state.socket.emit("signal", {peer: this.id, signalData: data})
          });

          this.peerConnection.on('stream', (stream) => {
            // got remote video stream, now let's show it in a video tag
            console.log('remote Stream Received')
            this.remoteVideo.srcObject = stream
            var promise = this.remoteVideo.play()
            promise
            .then(()=> {
              console.log("PLAYING")
            })
            .catch(()=> {
                console.log("ERROR IN PLAYING")
            })
          })
        })
        .then(()=>{
          if(!this.isCaller){
            this.$store.state.socket.emit("callAccept", { peer: this.id})
          }
        })
      }

    }
  }
</script>

<style scoped>
    video {
        width: 100%    !important;
        height: auto   !important;
    }
</style>