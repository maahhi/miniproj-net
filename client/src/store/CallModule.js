const CallModule = {
  actions: {
    sendOffer({rootState}, data) {
      rootState.socket.emit('offer', data)
    },
    sendAnswer({rootState}, data) {
      rootState.socket.emit('answer', data)
    },
    sendCandidate({rootState}, data) {
      rootState.socket.emit('candidate', data)
    }
  }
};

export default CallModule