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
import Partners from "@/views/partners/Partners";
import Article from "@/views/Article";
// import NotFound from "@/views/NotFound";
import Valorant from "@/views/esports/Valorant";
import ArticleEditor from "@/views/ArticleEditor";


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
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: NotFound
    // }
  ]
})
