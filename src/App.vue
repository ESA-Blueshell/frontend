<template>
  <v-app>
    <v-app-bar dark color="brown darken-4" elevate-on-scroll fixed>
      <v-app-bar-nav-icon @click="drawer = true"
                          v-if="$vuetify.breakpoint.mdAndDown">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="ml-sm-n5 ml-md-0 ml-lg-0 ml-xl-0 ">
        <router-link to="/">
          <v-img contain :src="require('./assets/topbarlogo.png')" alt="Blueshell logo"
                 style="height: 50px;width: 144px" class="mr-4">
          </v-img>
        </router-link>
      </v-toolbar-title>
      <div v-if="$vuetify.breakpoint.lgAndUp"
           style="height: 100%">
        <v-btn class="bar-button" text dark to="/">Home</v-btn>
        <v-btn class="bar-button" text dark to="/membership">Membership</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark to="/aboutus">Association
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/aboutus">About us</v-list-item>
            <v-list-item to="/board">Board</v-list-item>
            <v-list-item to="/committees">Committees</v-list-item>
            <v-list-item to="/documents">Documents</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark to="/events">Events</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark to="/esports">Esports
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/esports">Competitive scene</v-list-item>
            <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
            <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike: Global
              Offensive
            </v-list-item>
            <v-list-item to="/esports/rocket-league">Rocket League</v-list-item>
            <v-list-item to="/esports/super-smash-bros">Super Smash Bros.</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark to="/news">News</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark
                   to="/partners/become-a-partner">Partners
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/partners/become-a-partner">Become a partner!</v-list-item>
            <!--            <v-list-item to="/partners/el-nino">El Niño – Digital Development</v-list-item>-->
            <!--            <v-list-item to="/partners/ogd-ict">OGD ICT-diensten</v-list-item>-->
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark to="/contact">Contact</v-btn>
      </div>
      <!--      <v-spacer/>-->
      <!--      <v-btn class="bar-button" text dark to="/login">Login</v-btn>-->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary dark>
      <v-list nav>
        <v-list-item text dark to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item text dark to="/membership">
          <v-list-item-title>Membership</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <!-- why the fuck do list-groups not get a bottom margin but list items do what the fuck it's like they don't want us to use them in a navbar aaaaa -->
          <template v-slot:activator>
            <v-list-item-title>
              Association
            </v-list-item-title>
          </template>
          <v-list-item to="/aboutus">About us</v-list-item>
          <v-list-item to="/board">Board</v-list-item>
          <v-list-item to="/committees">Committees</v-list-item>
          <v-list-item to="/documents">Documents</v-list-item>
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark to="/events">
          <v-list-item-title>Events</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <template v-slot:activator>
            <v-list-item-title>
              Esports
            </v-list-item-title>
          </template>
          <v-list-item to="/esports">Competitive scene</v-list-item>
          <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
          <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike: Global
            Offensive
          </v-list-item>
          <v-list-item to="/esports/rocket-league">Rocket League</v-list-item>
          <v-list-item to="/esports/super-smash-bros">Super Smash Bros.</v-list-item>
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark to="/news">
          <v-list-item-title>News</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <template v-slot:activator>
            <v-list-item-title>
              Partners
            </v-list-item-title>
          </template>
          <v-list-item to="/partners/become-a-partner">Become a partner!</v-list-item>
          <!--          <v-list-item to="/partners/el-nino">El Niño – Digital Development</v-list-item>-->
          <!--          <v-list-item to="/partners/ogd-ict">OGD ICT-diensten</v-list-item>-->
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark to="/contact">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
        <!--        <v-list-item text dark to="/login">-->
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
              href="https://knowyourmeme.com/memes/trollface" target="_blank">esa-blueshell.nl</a>
          </p>
          <p><strong>What Are Cookies</strong></p>
          <p>As is common practice with almost all professional websites this site uses cookies,
            which are tiny files that are downloaded to your computer, to improve your experience.
            This page describes what information they gather, how we use it and why we sometimes
            need to store these cookies. We will also share how you can prevent these cookies from
            being stored however this may downgrade or 'break' certain elements of the sites
            functionality.</p>
          <p>For more general information on cookies, please read <a
              href="https://knowyourmeme.com/memes/trollface">"What Are Cookies"</a>.
            Information regarding cookies from this Cookies Policy are from <a
                href="https://knowyourmeme.com/memes/trollface">the Privacy Policy Generator</a>.
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
                href="https://knowyourmeme.com/memes/trollface">Cookies Policy
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
            <li>By visiting this link: <a href="https://knowyourmeme.com/memes/trollface"
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
          <h1>Hi, how are you</h1>
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
  </v-app>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      drawer: false,
      shellyLogo: require("./assets/shelly.png"),
      poggers: false,
      dialog: false,
      rickrollDialog: false,
      goodDialog: false,
    }
  },
  methods: {
    goto(url) {
      router.push(url)
    },

    closedialog() {
      this.dialog = false;
      this.$emit("dialog");
    },
    showRickrollDialog() {
      this.rickrollDialog = true
    },
    closeRickrollDialog() {
      this.rickrollDialog = false;
      this.$emit("rickrollDialog");
      this.goodDialog=true;
    },
    closeGoodDialog() {
      this.goodDialog = false;
      this.$emit("goodDialog");
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


    //<editor-fold desc="sounds">

    playDiscord()
    setTimeout(playKnocking, 20000)

    function playDiscord() {
      setTimeout(() => {
        if (!document.getElementById('knocking').paused) {
          setTimeout(playKnocking, 5000)
          return
        }
        document.getElementById('discord').play()
        console.log('get fucked')
        playDiscord()
      }, 1000 * (20 + Math.random() * 70))
    }

    function playKnocking() {
      setTimeout(() => {
        if (!document.getElementById('discord').paused) {
          setTimeout(playKnocking, 5000)
          return
        }

        document.getElementById('knocking').play()
        console.log('get fucked')
        playKnocking()
      }, 1000 * (30 + Math.random() * 120))
    }

    //</editor-fold>

    //<editor-fold desc="rickroll">

    let rickroll = document.getElementById('rickroll')
    let rickrolldiv = document.getElementById('rickrolldiv')
    let rickrolltext = document.getElementById('rickrolltext')
    let rickrollclose = document.getElementById('rickrollclose')

    rickroll.onpause = () => {
      rickroll.play()
    }
    rickroll.volume = 0.6
    rickroll.onvolumechange = () => {
      rickroll.volume = 0.6
    }


    function toTopLeft() {
      rickrolldiv.style.top = (Math.floor(Math.random() * 50)) + 'px'
      rickrolldiv.style.bottom = null
      rickrolldiv.style.left = (Math.floor(Math.random() * 50)) + 'px'
      rickrolldiv.style.right = null
    }

    function toTopRight() {
      rickrolldiv.style.top = (Math.floor(Math.random() * 50)) + 'px'
      rickrolldiv.style.bottom = null
      rickrolldiv.style.left = null
      rickrolldiv.style.right = (Math.floor(Math.random() * 50)) + 'px'
    }

    function toBottomLeft() {
      rickrolldiv.style.top = null
      rickrolldiv.style.bottom = (Math.floor(Math.random() * 50)) + 'px'
      rickrolldiv.style.left = (Math.floor(Math.random() * 50)) + 'px'
      rickrolldiv.style.right = null
    }

    function toBottomRight() {
      rickrolldiv.style.top = null
      rickrolldiv.style.bottom = (Math.floor(Math.random() * 50)) + 'px'
      rickrolldiv.style.left = null
      rickrolldiv.style.right = (Math.floor(Math.random() * 50)) + 'px'
    }

    function playRickRollRecursive() {
      rickroll.play()
      if (rickroll.paused) {
        setTimeout(playRickRollRecursive, 500)
      } else {
        moveRickrollUp()
      }
    }

    playRickRollRecursive()

    function moveRickrollUp() {
      let bottom = parseInt(rickrolldiv.style.bottom.split('px')[0])
      if (bottom > 20) {
        rickrollclose.addEventListener('mouseover', moveRickroll)
        return;
      }
      rickrolldiv.style.bottom = (bottom + 4 + Math.floor(Math.random() * 4)) + 'px'

      setTimeout(moveRickrollUp, 100 + Math.random() * 100)
    }

    function moveRickroll() {
      let number = Math.random()
      if (!rickrolldiv.style.right && !rickrolldiv.style.top) {
        if (number < 0.3) {
          toBottomRight()
        } else if (number > 0.6) {
          toTopLeft()
        } else {
          toTopRight()
        }
      } else if (!rickrolldiv.style.right && rickrolldiv.style.top) {
        if (number < 0.3) {
          toTopRight()
        } else if (number > 0.6) {
          toBottomRight()
        } else {
          toBottomLeft()
        }
      } else if (rickrolldiv.style.right && !rickrolldiv.style.top) {
        if (number < 0.3) {
          toBottomLeft()
        } else if (number > 0.6) {
          toTopRight()
        } else {
          toTopLeft()
        }
      } else if (rickrolldiv.style.right && rickrolldiv.style.top) {
        if (number < 0.3) {
          toTopLeft()
        } else if (number > 0.6) {
          toBottomLeft()
        } else {
          toBottomRight()
        }
      }
    }

    function changerickrolltext() {
      if (rickrolltext.style.color === 'yellow') {
        rickrolltext.style.color = 'blue'
      } else {
        rickrolltext.style.color = 'yellow'
      }
      setTimeout(changerickrolltext, 500)
    }

    changerickrolltext()

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

  }
}
</script>

<style>

.bar-button {
  margin: 2px;
  height: 100% !important;
}

</style>
