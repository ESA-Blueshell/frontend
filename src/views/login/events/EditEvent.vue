<template>
  <v-main>
    <top-banner :title="headerTitle"/>

    <div class="mb-8">
      <div
        class="mx-auto mt-10"
        style="max-width: 800px"
      >
        <event-form
          v-if="event !== null"
          ref="form"
          :initial-event="event"
          :has-promo="hasPromo"
          @submit="update"
          @title="(newTitle) => headerTitle = `Edit ${newTitle}`"
        />
      </div>
    </div>
  </v-main>
</template>


<script>
import TopBanner from '@/components/top-banner';
import EventForm from "@/components/event-form";
import {$handleNetworkError} from "@/plugins/handleNetworkError";

export default {
  name: 'EditEvent',
  components: {EventForm, TopBanner},
  data: () => ({
    event: null,
    hasPromo: false,
    headerTitle: 'Edit Event'
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

            signUpForm: event.signUpForm ? JSON.parse(event.signUpForm) : null,
            enableSignUpForm: !!event.signUpForm,
          }

          this.headerTitle = `Edit ${event.title}`
          this.event.endDateSame = this.event.startDate === this.event.endDate
        }
      })
      .catch(e => $handleNetworkError(e))
    if (this.event.image) {
      fetch(this.event.image)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.event.base64Image = reader.result.replace('data:', '').replace(/^.+,/, '');
            this.event.fileExtension = '.' + this.event.image.split('.').pop();
          };
          reader.readAsDataURL(blob);
        });
    }
  },
  methods: {
    methods: {
      update(event) {
        // Timestamp formatting
        let startTime = `${event.startDate} ${event.startTime}:00`;
        let endTime = `${event.endDate} ${event.endTime}:00`;

        let signUpForm = event.signUpForm && event.enableSignUpForm ? JSON.stringify(event.signUpForm) : null;

        // Always send base64Image and fileExtension
        this.$http.put(`events/${this.$route.params.id}`, {
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
          base64Image: event.base64Image,
          fileExtension: event.fileExtension,
        }, {
          headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`},
        })
          .then(response => {
            if (response && (response.status === 201 || response.status === 200)) {
              this.$router.push('../manage');
            }
          })
          .catch(e => {
            this.$refs.form.submitting = false;
            $handleNetworkError(e);
          });
      },
    },
  },
}
</script>

<style scoped>

</style>
