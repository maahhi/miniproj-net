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
                                    <h2>Offer SDP</h2>
                                    <textarea v-model="answerSdpTextarea"></textarea>
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
                                    <h2>Offer SDP</h2>
                                    <textarea v-model="offerSdpTextarea"></textarea>
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
  export default {
    name: "Call",
    props: [
      'id',
      'isCaller',
      'offer'
    ],
    data: function() {
      return {
        localStream:null,
        localVideo: null,
        remoteVideo: null,
        offerSdpTextarea: null,
        answerSdpTextarea: null,
        peerConnection: null
      }
    },
    mounted() {
      this.localVideo = document.querySelector('div#local video');
      this.remoteVideo = document.querySelector('div#remote video');
      this.$store.state.socket.on('answer', (data) => {
        this.setRemoteDescription(data.offer);
        console.log("ANSWER RECEIVED!!")
      });
      if (this.isCaller) {
        console.log("it's Caller")
        navigator.mediaDevices.getUserMedia({"video": true})
        .then(this.gotStream)
        .then(this.createPeerConnection)
        .then(()=> {
          this.peerConnection.addStream(this.localStream)
          // localStream.getTracks()
          // .forEach(track => this.peerConnection.addTrack(track, localStream));
          // console.log('Adding Local Stream to peer connection');
        })
        .then(this.createOffer)
        .then(this.setOffer)
        .then((offer) => {
          this.$store.dispatch('sendOffer', { callee: this.id, offer: offer })
        })
        .catch(this.logError)
      }
      else {
        console.log("it's Callee");
        const servers = null;
        this.peerConnection = new RTCPeerConnection(servers);
        this.peerConnection.ontrack = this.gotRemoteStream;
        this.peerConnection.ondatachannel = this.receiveChannelCallback;
        this.setRemoteDescription(this.offer)
        .then(this.createAnswer)
        .then(this.setOffer)
        .then((answer) => {
          this.$store.dispatch('sendAnswer', { caller: this.id, offer: answer })
        })
      }
      
    },
    methods: {
      async getMedia() {

        if (this.localStream) {
          this.localVideo.srcObject = null;
          this.localStream.getTracks().forEach(track => track.stop());
        }
        const audioSource = audioSelect.value;
        console.log(`Selected audio source: ${audioSource}`);
        const videoSource = videoSelect.value;
        console.log(`Selected video source: ${videoSource}`);

        const constraints = {
          audio: {
            optional: [{
              sourceId: audioSource
            }]
          },
          video: {
            optional: [{
              sourceId: videoSource
            }]
          }
        };
        console.log('Requested local stream');
        try {
          const userMedia = await navigator.mediaDevices.getUserMedia(constraints);
          gotStream(userMedia);
        } catch (e) {
          console.log('navigator.getUserMedia error: ', e);
        }
      },
      gotStream: function(stream) {
        console.log('Received local stream');
        this.localVideo.srcObject = stream;
        this.localStream = stream;
      },
      createPeerConnection() {
        var servers = { "iceServers": [{ "urls": "stun:stun.1.google.com:19302"}] };
        this.peerConnection = new RTCPeerConnection(servers);

      },
      async createOffer() {
        const offerOptions = {
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1
        };
        try {
          const offer = await this.peerConnection.createOffer(offerOptions);
          this.gotDescription1(offer);
          return offer
        } catch (e) {
          this.onCreateSessionDescriptionError(e);
        }
      },
      async setOffer(offer) {
        console.log("SETTING OFFER")

        console.log(offer)
        console.log(`Modified Offer from localPeerConnection\n${offer.sdp}`);

        try {
          // eslint-disable-next-line no-unused-vars
          const ignore = await this.peerConnection.setLocalDescription(offer);
          this.onSetSessionDescriptionSuccess();
        } catch (e) {
          this.onSetSessionDescriptionError(e);
        }

        return offer
      },
      async createAnswer() {
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        try {
          const answer = await this.peerConnection.createAnswer();
          this.gotDescription2(answer);
          return answer
        } catch (e) {
          this.onCreateSessionDescriptionError(e);
        }
      },
      async setRemoteDescription(offer) {
        try {
          // eslint-disable-next-line no-unused-vars
          const ignore = await this.peerConnection.setRemoteDescription(offer);
          this.onSetSessionDescriptionSuccess();
        } catch (e) {
          this.onSetSessionDescriptionError(e);
        }
      },
      gotDescription1(description) {
        this.offerSdpTextarea = description.sdp;
      },
      gotDescription2(description) {
        this.answerSdpTextarea = description.sdp;
      },
      onCreateSessionDescriptionError(error) {
        console.log(`Failed to create session description: ${error.toString()}`);
      },
      onSetSessionDescriptionSuccess() {
        console.log('Set session description success.');
      },
      onSetSessionDescriptionError(error) {
        console.log(`Failed to set session description: ${error.toString()}`);
      },
      logError: function(error) {
        console.log(error)
      },
      gotRemoteStream(e) {
        console.log("SETTING REMOTE STREAM!!  ?>:LJ:OSAIHIPUSAFGPUK")
        console.log(e.streams)
        if (this.remoteVideo.srcObject !== e.streams[0]) {
          console.log("???")
          this.remoteVideo.srcObject = e.streams[0];
          console.log('Received remote stream');
        }
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