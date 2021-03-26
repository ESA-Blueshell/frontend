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
        <v-card-text style="font-size: large">
          <p>
            Ok so apparently there's this thing called cookies and i need to ask for permission to
            get them. Sooooo, can i get them? pls? ..... <br>
            No, ok cool.. honestly it's fine it's not like I want your cookies or anything!! B-Baka.
          </p>
          <p><strong>What Are Cookies</strong></p>
          <p>
            Today when I walked into my economics class I saw something I dread every time I close
            my eyes. Someone had brought their new gaming laptop to class. The Forklift he used to
            bring it was still running idle at the back. I started sweating as I sat down and gazed
            over at the 700lb beast that was his laptop. He had already reinforced his desk with
            steel support beams and was in the process of finding an outlet for a power cable
            thicker than Amy
            Schumer's thigh. I start shaking. I keep telling myself I'm going to be alright and that
            there's nothing to worry about. He somehow finds a fucking outlet. Tears are running
            down my cheeks as I send my last texts to my family saying I love them. The teacher
            starts the lecture, and the student turns his laptop on. The colored lights on his RGB
            Backlit
            keyboard flare to life like a nuclear flash, and a deep humming fills my ears and shakes
            my very soul. The entire city power grid goes dark. The classroom begins to shake as the
            massive fans begin to spin. In mere seconds my world has gone from vibrant life, to a
            dark, earth shattering void where my body is getting torn apart by the 150mph gale force
            winds and the 500 decibel groan of the cooling fans. As my body finally surrenders, I
            weep, as my school and my city go under. I fucking hate gaming laptops.
          </p>
          <p><strong>How We Use Cookies</strong></p>
          <p>
            My mum (82F) told me (12M) to do the dishes (16) but I (12M) was too busy playing
            Fortnite (3 kills) so I (12M) grabbed my controller (DualShock 4) and threw it at her
            (138kph). She fucking died, and I (12M) went to prison (18 years). While in prison I
            (12M) incited several riots (3) and assumed leadership of a gang responsible for
            smuggling drugs (cocaine) into the country. I (12M) also ordered the assassination of
            several celebrities (Michael Jackson, Elvis Presley and Jeffrey Epstein) and planned a
            terrorist attack (9/11). Reddit, AITA?
          </p>

          <p><strong>Disabling Cookies</strong></p>
          <p>
            Wtf am I jerking off to? How has my life gone so downhill that I'm jacking off to
            drawings? I think I know why my dad left. It's because he knew what I would be doing in
            20 years from now. Is this my life now. Do I Really get fucking aroused when I see a
            stickman with boobs, I do. Who am I inside? I don't know because I'm too busy jerking
            off to stickmen with boobs.
          </p>

          <p><strong>The Cookies We Set</strong></p>
          <p>
            Is het hebben van dochters de ultieme hoorndragerij?
          </p>
          <ul>
            <li>
              <p>Account related cookies</p>
              <p>
                Ik kan niet iets ergers verzinnen of bevatten dat meer hoorndragelijkers is dan een
                dochter hebben. Denk er even rationeel over. Je voedt, kleedt, verzorgt en teelt een
                meisje voor ten minste 18 jaar puur zodat ze weg gaat en door een andere man
                geplunderd kan worden. Al het harde werk dat je stopt in je beeldschone kleine
                engeltje - haar verhaaltjes voorlezen voor het slapen, haar naar sport brengen en
                weer ophalen, een gezonde en gebalanceerde maaltijd voor haar klaarmaken, haar de
                belangrijkste levenslessen bijbrengen, met haar spelen. Alles resulteert naar één
                consequentie: haar lichaam zal meer genoten worden door de man die haar uiteindelijk
                in elke gaatje ketst.
              </p>
            </li>
            <li>
              <p>Login related cookies</p>
              <p>
                De perfecte dochter opgevoed? Geweldig. Wie profiteert hier van? Als je geluk hebt,
                een willekeurige man die niets met haar te maken had toen ze opgroeide, die met haar
                gaat trouwen. Hij heeft de privilege om haar elke nacht vol te blaffen in haar
                strakke poes. Hij zal de voordelen ervaren van haar aardige en beminnelijke
                persoonlijkheid waar jij verantwoordelijk voor was.
              </p>
            </li>
            <li>
              <p>Doxxing related cookies</p>
              <p>
                Als een man die een dochter heeft, ben je LETTERLIJK 20 jaar van je leven aan het
                opofferen om een meisje op te voeden zodat een andere man van haar geniet. Het is
                simpelweg de ULTIEME EN DEFINITIEVE hoorndragerij. Denk er logisch over na
              </p>
            </li>
          </ul>

          <p><strong>Third Party Cookies</strong></p>
          <p>
            Nani the fuck did you just fucking iimasu about watashi, you chiisai bitch desuka?
            Watashi’ll have anata know that watashi graduated top of my class in Nihongo 3, and
            watashi’ve been involved in iroirona Nihongo tutoring sessions, and watashi have over
            sanbyaku perfect test scores. Watashi am trained in kanji, and watashi is the top letter
            writer in all of southern California. Anata are nothing to watashi but just another
            weaboo. Watashi will korosu anata the fuck out with vocabulary the likes of which has
            never been mimasu’d before on this continent, mark watashino fucking words. Anata thinks
            anata can get away with hanashimasing that kuso to watashi over the intaaneto? Omou
            again, fucker. As we hanashimasu, watashi am contacting watashino secret netto of otakus
            across the USA, and anatano IP is being traced right now so you better junbishimasu for
            the ame, ujimushi. The ame that korosu’s the pathetic chiisai thing anata calls anatano
            life. You’re fucking shinimashita’d, akachan.
          </p>

          <p><strong>More Information</strong></p>
          <p>Hopefully that has clarified things for you and as was previously mentioned if there is
            something that you aren't sure whether you need or not it's usually safer to leave
            cookies enabled in case it does interact with one of the features you use on our
            site.</p>
          <p>However if you are still looking for more information then you can contact us through
            one of our preferred contact methods:</p>
          <ul>
            <li>Email: e@mail.com</li>
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
    <img src="./assets/dust.png" id="dust"
         style="position: fixed;height: 100%; width: 100%; object-fit: cover;z-index: 9999;pointer-events: none;opacity: 0.01;">
  </v-app>
</template>
<script>
import router from "@/router";
// eslint-disable-next-line no-unused-vars
import devTools from "devtools-detect";

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
        setTimeout(() => {
          document.getElementById('knocking').play()
          console.log('get fucked')
          this.playKnocking()
        }, 1000 * (10 + Math.random() * 10))
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
        document.getElementById('discord').play()
        console.log('get fucked')
        this.playDiscord()
      }, 1000 * (20 + Math.random() * 20))
    }, playKnocking() {
      setTimeout(() => {
        document.getElementById('knocking').play()
        console.log('get fucked')
        this.playKnocking()
      }, 1000 * (60 + Math.random() * 80))
    },
    showPopup() {
      let cringwin = window.open(
          "https://esa-blueshell.nl/api/download/" + Math.ceil(Math.random() * 5) + ".jpg",
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


    let dust = document.getElementById('dust');

    function increaseDustRecursive() {
      if (parseFloat(dust.style.opacity) < 0.7) {
        dust.style.opacity = (parseFloat(dust.style.opacity) * 1.05).toString()
        setTimeout(increaseDustRecursive, 5000)
      }
    }

    increaseDustRecursive()
  }
}
</script>

<style>

.bar-button {
  margin: 2px;
  height: 100% !important;
}

</style>
