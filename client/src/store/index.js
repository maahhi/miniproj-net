import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import router from '../router'
import io from 'socket.io-client';
import ChatModule from './ChatModule'
import CallModule from './CallModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chat: ChatModule,
    call: CallModule
  },
  state: {
    me: {
      username: "",
      id: "",
      display_name: ""
    },
    contactList: [],
    connected: false,
    socket: null
  },
  getters: {
    contactByID: state => id => {
      if (id === state.me.id) {
        return state.me
      }
      else return state.contactList.find(contact => contact._id === id)
    },
    nameByID: (state, getters) => id => {
      let peer = getters.contactByID(id)
      if (peer.display_name)
        return peer.display_name;
      else return peer.username
    }
  },
  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contactList = contacts
    },
    SET_USER(state, user) {
      state.me = user
    },
    SET_SOCKET(state, socket) {
      state.socket = socket
    },
    SET_CONNECTED(state, connected) {
      state.connected = connected
    }
  },
  actions: {
    updateMyself({commit}) {
      axios.get('/whoami')
      .then(response => {
        console.log(response.data);
        commit("SET_USER", response.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    updateContacts({ commit }) {
      axios.get('/contact')
      .then(response => {
        console.log(response.data);
        commit('SET_CONTACTS', response.data)
      })
      .catch(err =>{
        console.log(err)
      })

    },
    createWS({ dispatch, commit, state }) {
      if(!state.socket) {
        let socket = io.connect( process.env.VUE_APP_API_URL, {
          'query': 'token=' + window.sessionStorage.jwt
        });
        commit('SET_SOCKET', socket);
        socket.on('connect', function () {
          commit('SET_CONNECTED', true)
        });
        socket.on('unauthorized', function(msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        });
        socket.on('msgBack', function (data) {
          dispatch('receiveMessage', data);
          console.log(data)
        })
        socket.on('call', function (data) {
          console.log("Call received")
          router.push({name: 'Call', params: {
              id: data.peer,
              isCaller: false
            }})
        })
      }
    }
  }
})
