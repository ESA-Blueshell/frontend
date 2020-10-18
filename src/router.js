import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import News from './views/News.vue'
import Events from './views/Events.vue'
import Contact from './views/Contact.vue'
import Committees from './views/Committees.vue'
import Membership from './views/Membership.vue'
import Esports from './views/Esports.vue'
import AboutUs from "./views/AboutUs";
import Board from "./views/Board";
import League from "./views/esports/League";
import Smash from "./views/esports/Smash";
import Csgo from "./views/esports/Csgo";
import RocketLeague from "./views/esports/RocketLeague";
import Documents from "@/views/Documents";


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
    {
      path: '/membership',
      name: 'membership',
      component: Membership
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    },
    {
      path: '/esports/league-of-legends',
      name: 'league',
      component: League
    },
    {
      path: '/esports/super-smash-bros',
      name: 'smash',
      component: Smash
    },
    {
      path: '/esports/counter-strike-global-offensive',
      name: 'csgo',
      component: Csgo
    },
    {
      path: '/esports/rocket-league',
      name: 'rocketleague',
      component: RocketLeague
    },
  ]
})
