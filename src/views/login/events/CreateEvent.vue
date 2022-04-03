<template>
  <v-main>
    <top-banner :title="eventTitle ? eventTitle : 'Create Event'"/>

    <div class="mx-3">
      <div class="mx-auto mt-10" style="max-width: 800px">
        <event-form ref="form" v-on:submit="create" v-on:title="updateTitle"/>
      </div>

    </div>
  </v-main>
</template>


<script>
import TopBanner from '@/components/top-banner';
import EventForm from "@/components/event-form";

export default {
  name: 'CreateEvent',
  components: {EventForm, TopBanner},
  data: () => ({
    eventTitle: null
  }),
  methods: {
    updateTitle(newTitle) {
      this.eventTitle = newTitle
    },
    create(event) {
      //Timestamp must be yyyy-mm-dd hh:mm:ss as a string
      let startTime = `${event.startDate} ${event.startTime}:00`
      let endTime = `${event.endDate} ${event.endTime}:00`

      let signUpForm = event.signUpForm.length > 0 ? JSON.stringify(event.signUpForm) : null


      this.$http.post('events',
          {
            title: event.title,
            description: event.description,
            location: event.location,
            startTime: startTime,
            endTime: endTime,
            memberPrice: event.memberPrice,
            publicPrice: event.publicPrice,
            visible: event.visible,
            membersOnly: event.membersOnly,
            signUp: event.signUp,
            committeeId: event.committeeId,
            signUpForm: signUpForm,

          }, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
      //     .then(response => {
      //
      //     })
      //     .catch(() => {
      //       // Show Incorrect login snackbar
      //       this.snackbar = true
      //     })
      // let signUpForm = this.$refs.signUpForm.$data.form
      // console.log(JSON.stringify(signUpForm))
      // console.log('VALID!!')
    },
  },
}
</script>

<style scoped>

</style>
