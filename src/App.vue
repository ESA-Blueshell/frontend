<template>
  <v-app>
    <v-app-bar dark color="brown darken-4" elevate-on-scroll fixed>
      <v-app-bar-nav-icon @click="drawer = true"
                          v-if="$vuetify.breakpoint.mdAndDown">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="ml-sm-n5 ml-md-0 ml-lg-0 ml-xl-0 ">
        <!--        <router-link @click="goto('/')">-->
        <v-img contain :src="require('./assets/topbarlogo.png')" alt="Blueshell logo"
               @click="goto('/')"
               style="height: 50px;width: 144px" class="mr-4">
        </v-img>
        <!--        </router-link>-->
      </v-toolbar-title>
      <div v-if="$vuetify.breakpoint.lgAndUp"
           style="height: 100%">
        <v-btn class="bar-button" text dark @click="goto('/')">Home</v-btn>
        <v-btn class="bar-button" text dark @click="goto('/membership')">Membership</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark @click="goto('/aboutus')">
              Association
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goto('/aboutus')">About us</v-list-item>
            <v-list-item @click="goto('/board')">Board</v-list-item>
            <v-list-item @click="goto('/committees')">Committees</v-list-item>
            <v-list-item @click="goto('/documents')">Documents</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark @click="goto('/events')">Events</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark @click="goto('/esports')">
              Esports
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goto('/esports')">Competitive scene</v-list-item>
            <v-list-item @click="goto('/esports/spijkerpoepen')">Competitive spijkerpoepen
              (nailpooping)
            </v-list-item>
            <v-list-item @click="goto('/esports/league-of-legends')">League of Legends</v-list-item>
            <v-list-item @click="goto('/esports/counter-strike-global-offensive')">Counter Strike:
              Global
              Offensive
            </v-list-item>
            <v-list-item @click="goto('/esports/rocket-league')">Rocket League</v-list-item>
            <v-list-item @click="goto('/esports/super-smash-bros')">Super Smash Bros.</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark @click="goto('/news')">News</v-btn>
        <v-btn class="bar-button" text dark @click="goto('/contact')">Contact</v-btn>
        <v-btn class="bar-button" text dark @click="goto('/blog')">My Blog</v-btn>
      </div>
      <!--      <v-spacer/>-->
      <!--      <v-btn class="bar-button" text dark @click=goto('login"')>Login</v-btn>-->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary dark>
      <v-list nav>
        <v-list-item text dark @click="goto('/')">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item text dark @click="goto('/membership')">
          <v-list-item-title>Membership</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <!-- why the fuck do list-groups not get a bottom margin but list items do what the fuck it's like they don't want us to use them in a navbar aaaaa -->
          <template v-slot:activator>
            <v-list-item-title>
              Association
            </v-list-item-title>
          </template>
          <v-list-item @click="goto('/aboutus')">About us</v-list-item>
          <v-list-item @click="goto('/board')">Board</v-list-item>
          <v-list-item @click="goto('/committees')">Committees</v-list-item>
          <v-list-item @click="goto('/documents')">Documents</v-list-item>
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark @click="goto('/events')">
          <v-list-item-title>Events</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <template v-slot:activator>
            <v-list-item-title>
              Esports
            </v-list-item-title>
          </template>
          <v-list-item @click="goto('/esports')">Competitive scene</v-list-item>
          <v-list-item @click="goto('/esports/spijkerpoepen')">Competitive spijkerpoepen
            (nailpooping)
          </v-list-item>
          <v-list-item @click="goto('/esports/league-of-legends')">League of Legends</v-list-item>
          <v-list-item @click="goto('/esports/counter-strike-global-offensive')">Counter Strike:
            Global
            Offensive
          </v-list-item>
          <v-list-item @click="goto('/esports/rocket-league')">Rocket League</v-list-item>
          <v-list-item @click="goto('/esports/super-smash-bros')">Super Smash Bros.</v-list-item>
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark @click="goto('/news')">
          <v-list-item-title>News</v-list-item-title>
        </v-list-item>
        <v-list-item text dark @click="goto('/contact')">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
        <v-list-item text dark @click="goto('/blog')">
          <v-list-item-title>My Blog</v-list-item-title>
        </v-list-item>
        <!--        <v-list-item text dark @click=goto('login"')>-->
        <!--          <v-list-item-title>Login</v-list-item-title>-->
        <!--        </v-list-item>-->

      </v-list>
      <template v-slot:append>
        <div class="mx-4">
          <v-row>
            <v-col>
              <v-btn icon href="mailto:board@blueshell.utwente.nl">
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon href="https://www.facebook.com/BlueshellEsports/" target="_blank">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon href="https://www.instagram.com/blueshellesports/" target="_blank">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon href="https://twitter.com/BlueshellESA" target="_blank">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </v-col>
          </v-row>

        </div>
      </template>
    </v-navigation-drawer>
    <!--    <v-main>-->
    <router-view/>
    <!--    </v-main>-->
    <v-footer dark color="brown darken-4">
      <v-btn icon href="mailto:board@blueshell.utwente.nl">
        <v-icon>mdi-email</v-icon>
      </v-btn>
      <v-btn icon href="https://www.facebook.com/BlueshellEsports/" target="_blank">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon href="https://www.instagram.com/blueshellesports/" target="_blank">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn icon href="https://twitter.com/BlueshellESA" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <!--      <v-btn href="https://www.elnino.tech/" target="_blank">-->
      <!--        El Niño-->
      <!--      </v-btn>-->
      <!--      <v-btn href="https://www.ogd.nl/" target="_blank">-->
      <!--        OGD-->
      <!--      </v-btn>-->
      <v-spacer></v-spacer>
      <div class="white--text">SITECIE GANG &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
    <v-snackbar rounded v-model="poggers" timeout="105000">
      <audio controls autoplay v-if="poggers">
        <source src="./assets/blueshellanthem.mp3" type="audio/mpeg">
      </audio>
    </v-snackbar>
    <audio id="discord">
      <source src="./assets/discord.mp3" type="audio/mpeg">
    </audio>
    <audio id="knocking">
      <source src="./assets/knocking.mp3" type="audio/mpeg">
    </audio>
    <audio id="chingchong" loop>
      <source src="./assets/chingchong.mp3" type="audio/mpeg">
    </audio>
    <div
        style="z-index: 200;width: 400px;height: 240px;position: fixed;bottom: -240px;left: 20px;background-color: red;border-radius: 10px"
        id="rickrolldiv">
      <p id="rickrolltext"
         style="color: yellow;font-family: 'Comic Sans MS',serif !important;font-weight: bold;position: absolute;top: 14px;left: 6px;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;">
        yOu woN'T bElieVE wHAT HapPEnS at 1:57!!
      </p>
      <v-icon id="rickrollclose" style="position: absolute;top: 2px;right: 10px;cursor: pointer"
              @click="showRickrollDialog">
        mdi-close
      </v-icon>
      <video width="320" height="180" id="rickroll" loop
             style="left: 50px;top: 50px;position: absolute;">
        <source src="./assets/rickroll.mp4" type="video/mp4">
      </video>
    </div>
    <v-dialog
        v-model="this.dialog"
        width="600px"
        persistent
        id="cookies"
    >
      <v-card id="cookiescard">
        <v-card-title>
          <h1>Cookie Policy for Shitshell ease port</h1>
        </v-card-title>
        <v-card-text>
          <p>This is the Cookie Policy for Shitshell ease port, accessible from <a
              href="https://images-ext-2.discordapp.net/external/E179MQwXxZUFkccEPIOG-xS8VPBuQdLi4ZnrNXglcpM/%3F1296494117/https/i.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg"
              target="_blank">esa-blueshell.nl</a>
          </p>
          <p><strong>What Are Cookies</strong></p>
          <p>As is common practice with almost all professional websites this site uses cookies,
            which are tiny files that are downloaded to your computer, to improve your experience.
            This page describes what information they gather, how we use it and why we sometimes
            need to store these cookies. We will also share how you can prevent these cookies from
            being stored however this may downgrade or 'break' certain elements of the sites
            functionality.</p>
          <p>For more general information on cookies, please read <a
              href="https://images-ext-2.discordapp.net/external/E179MQwXxZUFkccEPIOG-xS8VPBuQdLi4ZnrNXglcpM/%3F1296494117/https/i.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg">"What
            Are Cookies"</a>.
            Information regarding cookies from this Cookies Policy are from <a
                href="https://images-ext-2.discordapp.net/external/E179MQwXxZUFkccEPIOG-xS8VPBuQdLi4ZnrNXglcpM/%3F1296494117/https/i.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg">the
              Privacy Policy Generator</a>.
          </p>
          <p><strong>How We Use Cookies</strong></p>
          <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases
            there are no industry standard options for disabling cookies without completely
            disabling the functionality and features they add to this site. It is recommended that
            you leave on all cookies if you are not sure whether you need them or not in case they
            are used to provide a service that you use.</p>
          <p><strong>Disabling Cookies</strong></p>
          <p>You can prevent the setting of cookies by adjusting the settings on your browser (see
            your browser Help for how to do this). Be aware that disabling cookies will affect the
            functionality of this and many other websites that you visit. Disabling cookies will
            usually result in also disabling certain functionality and features of the this site.
            Therefore it is recommended that you do not disable cookies. This Cookies Policy was
            created with the help of the <a
                href="https://images-ext-2.discordapp.net/external/E179MQwXxZUFkccEPIOG-xS8VPBuQdLi4ZnrNXglcpM/%3F1296494117/https/i.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg">Cookies
              Policy
              Generator from CookiePolicyGenerator.com</a>.</p>
          <p><strong>The Cookies We Set</strong></p>
          <ul>
            <li>
              <p>Account related cookies</p>
              <p>If you create an account with us then we will use cookies for the management of the
                signup process and general administration. These cookies will usually be deleted
                when you log out however in some cases they may remain afterwards to remember your
                site preferences when logged out.</p>
            </li>
            <li>
              <p>Login related cookies</p>
              <p>We use cookies when you are logged in so that we can remember this fact. This
                prevents you from having to log in every single time you visit a new page. These
                cookies are typically removed or cleared when you log out to ensure that you can
                only access restricted features and areas when logged in.</p>
            </li>
            <li>
              <p>Email newsletters related cookies</p>
              <p>This site offers newsletter or email subscription services and cookies may be used
                to remember if you are already registered and whether to show certain notifications
                which might only be valid to subscribed/unsubscribed users.</p>
            </li>
            <li>
              <p>Orders processing related cookies</p>
              <p>This site offers e-commerce or payment facilities and some cookies are essential to
                ensure that your order is remembered between pages so that we can process it
                properly.</p>
            </li>
            <li>
              <p>Surveys related cookies</p>
              <p>From time to time we offer user surveys and questionnaires to provide you with
                interesting insights, helpful tools, or to understand our user base more accurately.
                These surveys may use cookies to remember who has already taken part in a survey or
                to provide you with accurate results after you change pages.</p>
            </li>
            <li>
              <p>Forms related cookies</p>
              <p>When you submit data to through a form such as those found on contact pages or
                comment forms cookies may be set to remember your user details for future
                correspondence.</p>
            </li>
            <li>
              <p>Site preferences cookies</p>
              <p>In order to provide you with a great experience on this site we provide the
                functionality to set your preferences for how this site runs when you use it. In
                order to remember your preferences we need to set cookies so that this information
                can be called whenever you interact with a page is affected by your preferences.</p>
            </li>
          </ul>
          <p><strong>Third Party Cookies</strong></p>
          <p>In some special cases we also use cookies provided by trusted third parties. The
            following section details which third party cookies you might encounter through this
            site.</p>
          <ul>
            <li>
              <p>This site uses Google Analytics which is one of the most widespread and trusted
                analytics solution on the web for helping us to understand how you use the site and
                ways that we can improve your experience. These cookies may track things such as how
                long you spend on the site and the pages that you visit so we can continue to
                produce engaging content.</p>
              <p>For more information on Google Analytics cookies, see the official Google Analytics
                page.</p>
            </li>
            <li>
              <p>Third party analytics are used to track and measure usage of this site so that we
                can continue to produce engaging content. These cookies may track things such as how
                long you spend on the site or pages you visit which helps us to understand how we
                can improve the site for you.</p>
            </li>
            <li>
              <p>From time to time we test new features and make subtle changes to the way that the
                site is delivered. When we are still testing new features these cookies may be used
                to ensure that you receive a consistent experience whilst on the site whilst
                ensuring we understand which optimisations our users appreciate the most.</p>
            </li>
            <li>
              <p>As we sell products it's important for us to understand statistics about how many
                of the visitors to our site actually make a purchase and as such this is the kind of
                data that these cookies will track. This is important to you as it means that we can
                accurately make business predictions that allow us to monitor our advertising and
                product costs to ensure the best possible price.</p>
            </li>

            <li>
              <p>The Google AdSense service we use to serve advertising uses a DoubleClick cookie to
                serve more relevant ads across the web and limit the number of times that a given ad
                is shown to you.</p>
              <p>For more information on Google AdSense see the official Google AdSense privacy
                FAQ.</p>
            </li>
            <li>
              <p>We use adverts to offset the costs of running this site and provide funding for
                further development. The behavioural advertising cookies used by this site are
                designed to ensure that we provide you with the most relevant adverts where possible
                by anonymously tracking your interests and presenting similar things that may be of
                interest.</p>
            </li>
            <li>
              <p>Several partners advertise on our behalf and affiliate tracking cookies simply
                allow us to see if our customers have come to the site through one of our partner
                sites so that we can credit them appropriately and where applicable allow our
                affiliate partners to provide any bonus that they may provide you for making a
                purchase.</p>
            </li>
            <li>
              <p>We also use social media buttons and/or plugins on this site that allow you to
                connect with your social network in various ways. For these to work the following
                social media sites including; {List the social networks whose features you have
                integrated with your site?:12}, will set cookies through our site which may be used
                to enhance your profile on their site or contribute to the data they hold for
                various purposes outlined in their respective privacy policies.</p>
            </li>
          </ul>
          <p><strong>More Information</strong></p>
          <p>Hopefully that has clarified things for you and as was previously mentioned if there is
            something that you aren't sure whether you need or not it's usually safer to leave
            cookies enabled in case it does interact with one of the features you use on our
            site.</p>
          <p>However if you are still looking for more information then you can contact us through
            one of our preferred contact methods:</p>
          <ul>
            <li>Email: uhhhhhhhhhhhhhhhh</li>
            <li>By visiting this link: <a
                href="https://images-ext-2.discordapp.net/external/E179MQwXxZUFkccEPIOG-xS8VPBuQdLi4ZnrNXglcpM/%3F1296494117/https/i.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg"
                target="_blank">esa-blueshell.nl</a></li>
            <li>Phone: 06 12345678</li>
          </ul>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="closedialog"
          >
            deez
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="closedialog"
          >
            nuts
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="this.rickrollDialog"
        max-width="400px"
        persistent
        id="rickrollDialog"
    >
      <v-card>
        <v-card-title>
          <h1>Hi, how is your day so far?</h1>
        </v-card-title>
        <v-card-text>
          <h3>
            just curious to see how your day is going :)
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-btn
              outlined
              color="red darken-1"
              text
              style="font-weight: bold"
              @click="closeRickrollDialog"
          >
            it was good
          </v-btn>
          <v-spacer/>
          <v-btn
              outlined
              color="green darken-1"
              text
              style="font-weight: bold"
              @click="closeRickrollDialog"
          >
            it was cringe
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="this.goodDialog"
        max-width="400px"
        persistent
    >
      <v-card>
        <v-card-title>
          <h1>good</h1>
        </v-card-title>
        <v-card-text>
          <h3>
            good
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              outlined
              color="orange darken-1"
              text
              @click="closeGoodDialog"
              style="font-weight: bold"
          >
            good
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <img src="./assets/deadpixelred.png" id="deadpixelred"
         style="position: fixed;left: 100px;top: 400px;z-index: 10000;visibility: hidden">
    <img src="./assets/deadpixelgreen.png" id="deadpixelgreen"
         style="position: fixed;right: 400px;bottom: 200px;z-index: 10000;visibility: hidden">
  </v-app>
</template>
<script>
import router from "@/router";
// eslint-disable-next-line no-unused-vars

export default {
  data() {
    return {
      drawer: false,
      shellyLogo: require("./assets/shelly.png"),
      poggers: false,
      dialog: false,
      rickrollDialog: false,
      goodDialog: false,
      rickroll: null,
      rickrolldiv: null,
      rickrolltext: null,
      rickrollclose: null,
      popups: [
        "./assets/popups/1.png",
        "./assets/popups/2.png",
        "./assets/popups/3.png",
      ],
    }
  },
  methods: {
    goto(url) {

      if (Math.random() > 0.3) {
        this.showPopup()
      }
      router.push(url)
    },

    closedialog() {
      this.dialog = false;
      this.$emit("dialog");

      setTimeout(this.playRickRollRecursive, 4000)

    },
    showRickrollDialog() {
      this.rickrollDialog = true
    },
    closeRickrollDialog() {
      this.rickrollDialog = false;
      this.$emit("rickrollDialog");
      this.goodDialog = true;
    },
    closeGoodDialog() {
      this.goodDialog = false;
      this.$emit("goodDialog");
    },
    toTopLeft() {
      this.rickrolldiv.style.top = (Math.floor(Math.random() * 50)) + 'px'
      this.rickrolldiv.style.bottom = null
      this.rickrolldiv.style.left = (Math.floor(Math.random() * 50)) + 'px'
      this.rickrolldiv.style.right = null
    }, toTopRight() {
      this.rickrolldiv.style.top = (Math.floor(Math.random() * 50)) + 'px'
      this.rickrolldiv.style.bottom = null
      this.rickrolldiv.style.left = null
      this.rickrolldiv.style.right = (Math.floor(Math.random() * 50)) + 'px'
    }, toBottomLeft() {
      this.rickrolldiv.style.top = null
      this.rickrolldiv.style.bottom = (Math.floor(Math.random() * 50)) + 'px'
      this.rickrolldiv.style.left = (Math.floor(Math.random() * 50)) + 'px'
      this.rickrolldiv.style.right = null
    }, toBottomRight() {
      this.rickrolldiv.style.top = null
      this.rickrolldiv.style.bottom = (Math.floor(Math.random() * 50)) + 'px'
      this.rickrolldiv.style.left = null
      this.rickrolldiv.style.right = (Math.floor(Math.random() * 50)) + 'px'
    }, playRickRollRecursive() {
      this.rickroll.play()
      if (this.rickroll.paused) {
        setTimeout(this.playRickRollRecursive, 500)
      } else {
        this.moveRickrollUp()

        this.playDiscord()
        setTimeout(this.playKnocking, 10000)
      }
    }, moveRickrollUp() {
      let bottom = parseInt(this.rickrolldiv.style.bottom.split('px')[0])
      if (bottom > 20) {
        this.rickrollclose.addEventListener('mouseover', () => {
          setTimeout(this.moveRickroll, 100)
        })
        return;
      }
      this.rickrolldiv.style.bottom = (bottom + 4 + Math.floor(Math.random() * 4)) + 'px'

      setTimeout(this.moveRickrollUp, 100 + Math.random() * 100)
    }, moveRickroll() {
      let number = Math.random()
      if (!this.rickrolldiv.style.right && !this.rickrolldiv.style.top) {
        if (number < 0.3) {
          this.toBottomRight()
        } else if (number > 0.6) {
          this.toTopLeft()
        } else {
          this.toTopRight()
        }
      } else if (!this.rickrolldiv.style.right && this.rickrolldiv.style.top) {
        if (number < 0.3) {
          this.toTopRight()
        } else if (number > 0.6) {
          this.toBottomRight()
        } else {
          this.toBottomLeft()
        }
      } else if (this.rickrolldiv.style.right && !this.rickrolldiv.style.top) {
        if (number < 0.3) {
          this.toBottomLeft()
        } else if (number > 0.6) {
          this.toTopRight()
        } else {
          this.toTopLeft()
        }
      } else if (this.rickrolldiv.style.right && this.rickrolldiv.style.top) {
        if (number < 0.3) {
          this.toTopLeft()
        } else if (number > 0.6) {
          this.toBottomLeft()
        } else {
          this.toBottomRight()
        }
      }
    }, changerickrolltext() {
      if (this.rickrolltext.style.color === 'yellow') {
        this.rickrolltext.style.color = 'blue'
      } else {
        this.rickrolltext.style.color = 'yellow'
      }
      setTimeout(this.changerickrolltext, 500)
    },
    playDiscord() {
      setTimeout(() => {
        if (!document.getElementById('knocking').paused) {
          setTimeout(this.playKnocking, 5000)
          return
        }
        document.getElementById('discord').play()
        console.log('get fucked')
        this.playDiscord()
      }, 1000 * (20 + Math.random() * 20))
    }, playKnocking() {
      setTimeout(() => {
        if (!document.getElementById('discord').paused) {
          setTimeout(this.playKnocking, 5000)
          return
        }

        document.getElementById('knocking').play()
        console.log('get fucked')
        this.playKnocking()
      }, 1000 * (60 + Math.random() * 80))
    },
    showPopup() {
      let cringwin = window.open(
          "https://esa-blueshell.nl/api/download/"+ Math.ceil(Math.random() * 5) +".jpg",
          "AWOOGA",
          "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=500,height=500");
      cringwin.focus()
    },

  },
  mounted() {
    let keysPressed = [];
    window.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      keysPressed.push(key);
      if (keysPressed.toString().endsWith("arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a,enter")) {
        this.poggers = true
        alert("BIG SITECIE ENERGY")
        //todo: make epic easter eggerino
      }

    });


    //<editor-fold desc="rickroll">

    this.rickroll = document.getElementById('rickroll')
    this.rickrolldiv = document.getElementById('rickrolldiv')
    this.rickrolltext = document.getElementById('rickrolltext')
    this.rickrollclose = document.getElementById('rickrollclose')


    this.rickroll.onpause = () => {
      this.rickroll.play()
    }
    this.rickroll.volume = 0.6
    this.rickroll.onvolumechange = () => {
      this.rickroll.volume = 0.6
    }


    this.changerickrolltext()

    //</editor-fold>


    let cookies;
    let scrolling = false
    setTimeout(() => {
      this.dialog = true

      setTimeout(() => {

        cookies = document.getElementById('cookiescard').parentElement;

        let scrolledTimes = 0
        let maxScrollTimes = 30;
        cookies.onscroll = () => {
          if (!scrolling) {
            scrolledTimes++;
            if (scrolledTimes > maxScrollTimes) {
              maxScrollTimes = 20 + Math.random() * 20
              scrolledTimes = 0
              scrolling = true
              scrollback(20 + Math.random() * 25)
            }
          }
        }
      }, 500)

    }, 2000)

    function scrollback(times) {
      if (times > 0) {
        cookies.scrollTop -= 20;
        setTimeout(() => {
          scrollback(times - 1)
        }, 10)
      } else {
        scrolling = false
      }
    }

    // Get notified when it's opened/closed or orientation changes
    window.addEventListener('devtoolschange', event => {
      if (event.detail.isOpen) {
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        console.log('hidde is moderatore 乔里斯•德明克 board Hoodies\' child labor 联合打击战斗机 iskander\'s body pillow situation 水壶战争 cumshell 偶像破坏 shitshell\'s  约翰•德•威特 sohrab is rasist 食人 discussions channel 附加费 self-starring starboard 伯恩哈德亲王 Based Department 大法弟子 homophobia in dank memes 团体免疫 maiander blueshell room 格雷戈里乌斯脖子射门 smashcie\'s allegations 2017 年 el dino partnership 事件 ark server 比登堡集团 owCie dead 施工欺诈 fanaat gushing 皮姆•福图恩 blueshell budget review 2020  郁金香狂热  ඞ - ඞ amogus sus sus amogus乔里斯•德明克  vaccie nacie 同性恋婚姻 big data leak 2021 插图亲淑女兄弟会 blueshell stickers on urinals 豪尔赫•佐雷吉埃塔 indecency in ghibli nights 警察行动 ett 莫卢卡斯 2018 2019 种族隔离 coffee good for you? 亨克•奥滕政变 peter 2020 黑皮特 online gamenight 火车劫持蜜蜂重点shadow board \'19年马肉丑闻 Financial compass 劫持蜜蜂 SiteCie crunch 騷亂暴亂 Splatoon Jar 騷擾擾亂')
        document.getElementById('chingchong').play()
      }
    });

    setTimeout(() => {
      document.getElementById('deadpixelgreen').style.visibility = 'visible'
    }, 200000)
    setTimeout(() => {
      document.getElementById('deadpixelred').style.visibility = 'visible'
    }, 100000)

  }
}
</script>

<style>

.bar-button {
  margin: 2px;
  height: 100% !important;
}

</style>
