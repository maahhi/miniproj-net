const CallModule = {
  actions: {
    sendOffer({rootState}, data) {
      rootState.socket.emit('offer', data)
    },
    sendAnswer({rootState}, data) {
      rootState.socket.emit('answer', data)
    }
  }
};

export default CallModule