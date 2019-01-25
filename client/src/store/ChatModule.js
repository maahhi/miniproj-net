const ChatModule = {
  state: {
    messages: {
      "5c237b0db783eb196ec76484": [
        {
          receiver_id: "5c237b0db783eb196ec76484",
          content: "Hi1"
        },
        {
          sender_id: "5c237b0db783eb196ec76484",
          receiver_id: "5c237acbb783eb196ec76482",
          content: "Hi2"
        }
      ],
      "5c237b558003314ad4cae29d": [
        {
          receiver_id: "5c237b558003314ad4cae29d",
          content: "Bye1"
        },
        {
          sender_id: "5c237b558003314ad4cae29d",
          receiver_id: "5c237acbb783eb196ec76482",
          content: "Bye2"
        }
      ]
    }
  },
  getters: {
    messagesByID: state => id => {
      if (state.messages[id]) {
        return state.messages[id]
      }
      else return []
    },
    lastMessageByID: state => id => {
      if (state.messages[id]) {
        let chatMessages = state.messages[id]
        return chatMessages[chatMessages.length - 1]
      }
      else return ""
    }
  },
  mutations: {
    CREATE_MESSAGE_CONTAINER(state, id) {
      if (!state.messages[id]) {
        state.messages[id] = []
      }
    },
    ADD_MESSAGE(state, payload) {
      if (state.messages[payload.id]) {
        state.messages[payload.id].push(payload.message)
      }
      else {
        state.messages[payload.id] = [payload.message]
      }
    }
  },
  actions: {
    sendMessage({commit, rootState}, data) {
      commit('ADD_MESSAGE', { message: data, id: data.receiver_id });
      rootState.socket.emit('msg', data)
    },
    receiveMessage({commit}, data) {
      commit('ADD_MESSAGE', { message: data, id: data.sender_id })
    }
    // getChatHistory({ commit }, id) {
    //
    // }
  }
};

export default ChatModule