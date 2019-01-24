import Vue from 'vue'
// import MainView from './components/Main'
import LoginView from './views/Login'

import Router from 'vue-router'
import Home from './views/Home'
import Chat from './views/Chat'
import Call from './views/Call'
import addContact from './views/addContact'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,

    },
    {
      path: '/chat/:id',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/call/:id',
      name: 'Call',
      component: Call,
      props: true
    },
    {
      path: '/addContact',
      name: 'addContact',
      component: addContact
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: "login",
      component: LoginView
    }
  ]
})
