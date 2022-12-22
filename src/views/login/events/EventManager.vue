<template>
  <v-main>
    <top-banner title="Event Manager" />
    <div
      class="mx-auto my-10"
      style="max-width: 800px"
    >
      <v-btn
        class="mx-3"
        block
        :disabled="noCommittees"
        to="create"
      >
        Create new event
      </v-btn>


      <template v-if="$store.getters.isBoard && events.filter(e => !e.visible).length > 0">
        <p class="mt-8 mx-3 text-h3 text-center">
          Non-public events (to be approved)
        </p>
        <event-manage-list
          :events="events.filter(e => !e.visible)"
          :id-to-committee="idToCommittee"
        />
      </template>


      <p class="mt-8 mx-3 text-h3 text-center">
        Upcoming Events
      </p>

      <event-manage-list
        :events="events"
        :id-to-committee="idToCommittee"
      />

      <p class="mt-8 mx-3 text-h3 text-center">
        Past Events
      </p>

      <event-manage-list
        :events="pastEvents"
        :id-to-committee="idToCommittee"
      />

      <p
        v-if="events.length === 0"
        class="mx-3 text-h5"
      >
        Doesn't look like you have any upcoming events for your committees 😔😔😔 maybe create one? or two?
      </p>


      <v-img
        v-if="noCommittees"
        :src="require('../../../assets/noCommittees.jpg')"
      />
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";
import EventManageList from "@/components/event-manage-list";

export default {
  name: "EventManager",
  components: {EventManageList, TopBanner},
  data: () => ({
    events: [],
    pastEvents: [],
    idToCommittee: {},
    eventToDelete: null,
    noCommittees: false,
  }),
  mounted() {
    // Get upcoming events
    this.$http.get('events/upcoming?editable=true', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.events = response.data
          this.events.forEach(event => event.deleteDialog = false)
        })
        .catch(e => this.$root.handleNetworkError(e))

    //Get past events
    this.$http.get('events/past?editable=true', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.pastEvents = response.data
          this.pastEvents.forEach(event => event.deleteDialog = false)
        })
        .catch(e => this.$root.handleNetworkError(e))


    // Get the user's committees
    this.$http.get('committees', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          response.data.forEach(committee => {
            this.idToCommittee[committee.id] = committee.name
          })
          if (response.data.length === 0) {
            this.noCommittees = true
          }
        })
        .catch(e => this.$root.handleNetworkError(e))
  },
}
</script>

<style scoped>

</style>
