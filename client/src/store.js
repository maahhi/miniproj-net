import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contactList: null
  }
  ,
  mutations: {
    updateContacts(state) {
      axios.get('/contact')
      .then(response => {
        console.log(response.data);
        state.contactList = response.data;
      })
      .catch(err =>{
        console.log(err)
      })
    },
    setContacts(state, contacts) {
      state.contactList = contacts
    }
  },
  actions: {

  }
})
