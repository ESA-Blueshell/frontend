<template>
  <v-main>
    <top-banner :title="(event && event.title) ? event.title : 'Edit Event'"/>

    <div class="mx-3">
      <div class="mx-auto mt-10" style="max-width: 800px">
        <event-form v-if="event !== null" ref="form" :event="event" v-on:submit="update"/>
      </div>

    </div>
  </v-main>
</template>


<script>
import TopBanner from '@/components/top-banner';
import EventForm from "@/components/event-form";

export default {
  name: 'EditEvent',
  components: {EventForm, TopBanner},
  data: () => ({
    event: null
  }),
  mounted() {
    this.$http.get('events/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          if (response !== undefined) {
            let event = response.data

            this.event = {
              title: event.title,
              location: event.location,
              description: event.description,

              memberPrice: event.memberPrice ? event.memberPrice.toString() : '0',
              publicPrice: event.publicPrice ? event.publicPrice.toString() : '0',

              membersOnly: event.membersOnly,
              visible: event.visible,
              signUp: event.signUp,

              startDate: event.startTime.split('T')[0],
              endDate: event.endTime.split('T')[0],
              startTime: event.startTime.split('T')[1].slice(0, 5),
              endTime: event.endTime.split('T')[1].slice(0, 5),

              committeeId: event.committee,
              image: event.image,

              signUpForm: event.signUpForm ? JSON.parse(event.signUpForm) : [],

              enableSignUpForm: !!event.signUpForm,
              endDateSame: event.startDate === event.endDate,
            }
          }
        })
  },
  methods: {
    update(event) {
      //Timestamp must be yyyy-mm-dd hh:mm:ss as a string
      let startTime = `${event.startDate} ${event.startTime}:00`
      let endTime = `${event.endDate} ${event.endTime}:00`

      let signUpForm = event.signUpForm.length > 0 ? JSON.stringify(event.signUpForm) : null


      this.$http.put('events/' + this.$route.params.id,
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
          .then(response => {
            if (response !== undefined && (response.status === 201 || response.status === 200)) {
              this.$router.push('../manager')
            }
          })

      // let signUpForm = this.$refs.signUpForm.$data.form
      // console.log(JSON.stringify(signUpForm))
      // console.log('VALID!!')
    },
  },
}
</script>

<style scoped>

</style>
