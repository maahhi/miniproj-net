import axios from '../axios'
import Vue from "vue";

const ChatModule = {
  state: {
    messages: {

    }
  },
  getters: {
    messagesByID: state => id => {
      if (state.messages[id]) {
        return state.messages[id]
      }
      else return []
    },
    lastMessageByID: (state, getters) => id => {
      let chatMessages = getters.messagesByID(id);
      if (chatMessages.length > 0) {
        let lastMessage = chatMessages[chatMessages.length - 1];
        return getters.nameByID(lastMessage.sender_id) + ": " + lastMessage.content
      }
      else return ""
    }
  },
  mutations: {
    SET_MESSAGES(state, payload) {
      Vue.set(state.messages, payload.id, payload.history)
    },
    ADD_MESSAGE(state, payload) {
      if (state.messages[payload.id]) {
        state.messages[payload.id].push(payload.message)
      }
      else {
        Vue.set(state.messages, payload.id, [payload.message])
      }
    }
  },
  actions: {
    getHistory({commit}, id) {
      axios.get('/history/' + id)
      .then(response => {
        commit('SET_MESSAGES', {id: id, history: response.data})
      })
      .catch(err =>{
        console.log(err)
      })
    },
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