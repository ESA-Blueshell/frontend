import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import News from './views/News.vue'
import Events from './views/Events.vue'
import Contact from './views/Contact.vue'
import Committees from './views/Committees.vue'
import Esports from './views/Esports.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/committees',
      name: 'committees',
      component: Committees
    },
    {
      path: '/esports',
      name: 'esports',
      component: Esports
    },
  ]
})
