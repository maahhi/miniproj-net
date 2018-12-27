import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: {
      username: "",
      id: "",
      display_name: ""
    },
    contactList: null
  }
  ,
  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contactList = contacts
    },
    SET_USER(state, user) {
      state.me = user
    }
  },
  actions: {
    updateContacts({ commit }) {
      axios.get('/contact')
      .then(response => {
        console.log(response.data);
        commit('SET_CONTACTS', response.data)
      })
      .catch(err =>{
        console.log(err)
      })
    }
  }
})
