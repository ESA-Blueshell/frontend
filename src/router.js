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
import Csgo from "./views/esports/Csgo";
import Documents from "@/views/Documents";
import ElNino from "@/views/partners/ElNino";
import Brunen from "@/views/partners/Brunen";
import Dekimo from "@/views/partners/Dekimo";
import Partners from "@/views/partners/Partners";
import Article from "@/views/Article";
import NotFound from "@/views/NotFound";
import Valorant from "@/views/esports/Valorant";
import Login from "@/views/login/Login";
import Account from "@/views/login/Account";
import ArticleEditor from "@/views/ArticleEditor";

import store from './store'
import CreateEvent from "@/views/login/events/CreateEvent";
import EventManager from "@/views/login/events/EventManager";
import EditEvent from "@/views/login/events/EditEvent";
import UpcomingEvents from "@/views/login/events/UpcomingEvents";
import EventSignUps from "@/views/login/events/EventSignUps";
import CommitteeManager from "@/views/login/CommitteeManager";
import CreateAccount from "@/views/login/CreateAccount";
import EnableAccount from "@/views/login/EnableAccount";


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
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
      path: '/news/article/:id',
      component: Article
    },
    {
      path: '/news/create',
      component: ArticleEditor
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
      path: '/committees/manage',
      name: 'committeeManager',
      component: CommitteeManager,
      meta: {requiresAuth: true}
    },
    {
      path: '/esports',
      redirect: '/esports/competitive-scene'
    },
    {
      path: '/esports/competitive-scene',
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
      path: '/esports/counter-strike-global-offensive',
      name: 'csgo',
      component: Csgo
    },
    {
      path: '/esports/valorant',
      name: 'valorant',
      component: Valorant
    },
    {
      path: '/partners/become-a-partner',
      name: 'becomeapartner',
      component: Partners
    },
    {
      path: '/partners/el-nino',
      name: 'elnino',
      component: ElNino
    },
    {
      path: '/partners/brunen',
      name: 'brunen',
      component: Brunen
    },
    {
      path: '/partners/dekimo',
      name: 'dekimo',
      component: Dekimo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {requiresAuth: true}
    },
    {
      path: '/account/create',
      name: 'accountCreation',
      component: CreateAccount,
    },
    {
      path: '/account/enable',
      name: 'enableAccount',
      component: EnableAccount
    },
    {
      path: '/account/articleEditor',
      name: 'articleEditor',
      component: ArticleEditor,
      meta: {requiresAuth: true}
    },
    {
      path: '/events/create',
      name: 'createEvent',
      component: CreateEvent,
      meta: {requiresAuth: true}
    },
    {
      path: '/events/edit/:id',
      name: 'editEvent',
      component: EditEvent,
      meta: {requiresAuth: true}
    },
    {
      path: '/events/manage',
      name: 'eventManager',
      component: EventManager,
      meta: {requiresAuth: true}
    },
    {
      path: '/events/upcoming',
      name: 'upcomingEvents',
      component: UpcomingEvents,
      meta: {requiresAuth: true}
    },
    {
      path: '/events/signups/:id',
      name: 'eventSignUps',
      component: EventSignUps,
      meta: {requiresAuth: true}
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && (store.getters.getLogin == null || store.getters.tokenExpired)) {
    next({
      path: '/login',
      query: {redirect: to.fullPath},
    })
  } else {
    next()
  }
})


export default router
