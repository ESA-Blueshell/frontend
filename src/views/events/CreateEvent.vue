<template>
  <v-main>
    <top-banner :title="headerTitle" />

    <div class="mb-8">
      <div
        class="mx-auto mt-10"
        style="max-width: 800px"
      >
        <event-form
          ref="form"
          @submit="create"
          @title="(newTitle) => headerTitle = `Create ${newTitle}`"
        />
      </div>
    </div>
  </v-main>
</template>


<script>
import BannerTop from '@/components/BannerTop.vue';
import EventEdit from "@/components/EventEdit.vue";
import {$goto} from "@/plugins/goto";
import {$handleNetworkError} from "@/plugins/handleNetworkError";

export default {
  name: 'CreateEvent',
  components: {EventForm: EventEdit, TopBanner: BannerTop},
  data: () => ({
    headerTitle: 'Create Event'
  }),
  methods: {
    create(event) {
      //Timestamp passed to backend must be yyyy-mm-dd hh:mm:ss as a string
      let startTime = `${event.startDate} ${event.startTime}:00`
      let endTime = `${event.endDate} ${event.endTime}:00`

      let signUpForm = event.signUpForm ? JSON.stringify(event.signUpForm) : null

      if (event.image) {
        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = () => {
          // Use a regex to remove data url part
          let base64Image = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');
          let fileExtension = '.' + event.image.name.split('.').pop();

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
              base64Image: base64Image,
              fileExtension: fileExtension,
            }, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
            .then(response => {
              if (response !== undefined && (response.status === 201 || response.status === 200)) {
                $goto('manage')
              }
            })
            .catch(e => {
              this.$refs.form.submitting = false
              $handleNetworkError(e)
            })
        };
        reader.readAsDataURL(event.image);

      } else {
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
          .then(response => {
            if (response !== undefined && (response.status === 201 || response.status === 200)) {
              this.$router.push('manage')
            }
          })
          .catch(e => $handleNetworkError(e))
      }


    },
  },
}
</script>

<style scoped>

</style>
