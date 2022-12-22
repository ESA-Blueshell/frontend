<template>
  <v-main>
    <top-banner :title="(event && event.title) ? event.title : 'Edit Event'" />

    <div class="mx-3 mb-8">
      <div
        class="mx-auto mt-10"
        style="max-width: 800px"
      >
        <event-form
          v-if="event !== null"
          ref="form"
          :event="event"
          :has-promo="hasPromo"
          @submit="update"
        />
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
    event: null,
    hasPromo: false,
  }),
  mounted() {
    this.$http.get('events/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          if (response !== undefined) {
            let event = response.data

            this.hasPromo = !!event.banner

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
        .catch(e => this.$root.handleNetworkError(e))
  },
  methods: {
    update(event) {
      //Timestamp passed to backend must be yyyy-mm-dd hh:mm:ss as a string
      let startTime = `${event.startDate} ${event.startTime}:00`
      let endTime = `${event.endDate} ${event.endTime}:00`

      let signUpForm = event.signUpForm.length > 0 && event.enableSignUpForm ? JSON.stringify(event.signUpForm) : null


      if (event.image) {
        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = () => {
          // Use a regex to remove data url part
          let base64Image = reader.result
              .replace('data:', '')
              .replace(/^.+,/, '');
          let fileExtension = '.' + event.image.name.split('.').pop();

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
                base64Image: base64Image,
                fileExtension: fileExtension,
              }, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
              .then(response => {
                if (response !== undefined && (response.status === 201 || response.status === 200)) {
                  this.$router.push('../manage')
                }
              })
              .catch(e => {
                this.$refs.form.submitting = false
                this.$root.handleNetworkError(e)
              })
        };
        reader.readAsDataURL(event.image);

      } else {
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
                this.$router.push('../manage')
              }
            })
            .catch(e => {
              this.$refs.form.submitting = false
              this.$root.handleNetworkError(e)
            })
      }
    },
  },
}
</script>

<style scoped>

</style>
