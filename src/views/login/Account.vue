<template>
  <v-main>
    <top-banner title="My account"/>
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <p class="text-h3">
          Hello {{ user != null ? user.firstName : '' }}!
        </p>

        <p>
          On this page you can view your account data and edit it below. Fields like your name and e-mail address
          cannot be changed. You should contact board or sitecie on discord if you would like to change any of these
          fields
        </p>
        <p>
          On the "Upcoming events" page you will find all of the events that have been planned. Here, you can sign up
          for events that have it enabled, either by clicking the sign-up checkbox or filling in the sign-up form. (no
          more google forms baybee)
        </p>
        <p v-if="$store.getters.isActive">
          With the event manager, you can create and edit an upcoming event for one of the committees you're in. Once an
          event is created it will have to be approved by board {{ $store.getters.isBoard ? '(yes, you)' : '' }} before
          it will go public.
        </p>
        <p v-if="$store.getters.isBoard">
          Using the committee manager you can manage the committees in the association (duh). You can crate a committee,
          give it a description and add any members to it.
        </p>

        <div v-if="user">
          <UserEdit
            :user="user"
            editing
          />
        </div>


        <!--    TODO: make this beautiful. Maybe use skeleton loading elements?-->
        <v-progress-circular v-else/>
      </div>
    </div>
  </v-main>
</template>

<script>

import TopBanner from "@/components/banners/TopBanner.vue";
import {$handleNetworkError} from "@/plugins/handleNetworkError";
import {VPhoneInput} from "v-phone-input";
import {ref} from "vue";
import {DateTime} from 'luxon';
import UserEdit from "@/components/UserEdit.vue";
import { UserService } from "@/services";

export default {
  name: "Account",
  components: {UserEdit, VPhoneInput, TopBanner: TopBanner},
  setup() {
    const phone = ref('');
    return {phone};
  },
  data: () => ({
    user: null,
    valid: true,
    submitting: false,
    userService: new UserService(),
  }),
  mounted() {
    const login = this.$store.getters.getLogin

    this.userService.getUser(login.userId)
      .then(user => {
        this.user = user;
        if (user.dateOfBirth) {
          this.user.dateOfBirth = DateTime.fromISO(user.dateOfBirth);
        }
      })

    this.$http.get(`users/${login.userId}`, {headers: {'Authorization': `Bearer ${login.token}`}})
      .then(response => {
        this.user = response.data
        if (this.user.dateOfBirth) {
          this.user.dateOfBirth = DateTime.fromISO(this.user.dateOfBirth).toISODate();
        }
      })
  },
  methods: {
    copyObject(obj) {
      return Object.assign({}, obj);
    },
    async save() {
      const {valid} = await this.$refs.form.validate()

      if (!valid) {
        return;
      }

      this.submitting = true
      //Send new user object to backend
      const login = this.$store.getters.getLogin
      this.$http.put(`users/${login.userId}`, this.user, {headers: {'Authorization': `Bearer ${login.token}`}})
        .then(() => this.submitting = false)
        .catch(e => {
          if (e.response?.status === 400) {
            this.$store.commit('setStatusSnackbarMessage', e.response.data)
          } else {
            $handleNetworkError(e)
          }
        })
    },
  }
}
</script>

<style scoped>
.v-col:first-child {
  padding-left: 0;
}

.v-col:last-child {
  padding-right: 0;
}
</style>
