<template>
  <v-main>
    <!--    <top-banner :title="title ? title : 'Create Event'" :image="imageUrl"/>-->
    <top-banner title="Edit Event"/>

    <div class="mx-3">
      <div class="mx-auto mt-10" style="max-width: 800px">
        <event-form v-bind:event="event" v-on:submit="update()" ref="form"/>
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
    event: {
      title: '',
      location: '',
      description: '',

      memberPrice: '0',
      publicPrice: '0',

      membersOnly: false,
      visible: true,
      signUp: false,

      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',

      committeeId: '',
      image: null,

      signUpForm: [],

      enableSignUpForm: false,
      endDateSame: true,
    }
  }),
  mounted() {
    this.$http.get('events/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          let event = response.data

          this.event.title = event.title
          this.event.location = event.location
          this.event.description = event.description

          this.event.memberPrice = event.memberPrice ? event.memberPrice.toString() : '0'
          this.event.publicPrice = event.publicPrice ? event.publicPrice.toString() : '0'


          this.event.membersOnly = event.membersOnly
          this.event.visible = event.visible
          this.event.signUp = event.signUp


          this.event.startDate = event.startTime.split('T')[0]
          this.event.endDate = event.endTime.split('T')[0]
          this.event.startTime = event.startTime.split('T')[1].slice(0, 5)
          this.event.endTime = event.endTime.split('T')[1].slice(0, 5)

          this.event.endDateSame = this.event.startDate === this.event.endDate

          this.event.committeeId = event.committee
          this.event.image = event.image

          this.event.signUpForm = event.signUpForm ? JSON.parse(event.signUpForm) : []
          this.event.enableSignUpForm = this.event.signUpForm.length > 0

        })
  },
  methods: {
    update() {
      // //Timestamp must be yyyy-mm-dd hh:mm:ss as a string
      let startTime = `${this.event.startDate} ${this.event.startTime}:00`
      let endTime = `${this.event.endDate} ${this.event.endTime}:00`

      let signUpForm = this.event.signUpForm ? JSON.stringify(this.event.signUpForm) : null


      this.$http.put('events/' + this.$route.params.id,
          {
            title: this.event.title,
            description: this.event.description,
            location: this.event.location,
            startTime: startTime,
            endTime: endTime,
            memberPrice: this.event.memberPrice,
            publicPrice: this.event.publicPrice,
            visible: this.event.visible,
            membersOnly: this.event.membersOnly,
            signUp: this.event.signUp,
            committeeId: this.event.committeeId,
            signUpForm: signUpForm,

          }, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(() => {
            console.log('submitted???')
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
