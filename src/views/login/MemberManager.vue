<template>
  <v-main>
    <top-banner title="Member Manager"/>

    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-text-field v-model="search" label="Search for a user"/>

        <p class="text-h3">
          Non-member users
        </p>
        <v-list>
          <div v-for="(user,i) in users" v-bind:key="user.username">
            <div v-if="!user.roles.includes('MEMBER') && isSearched(user)">
              <v-list-item>
                <v-list-item-content @click="expanded = (expanded === i) ? null : i">
                  <v-list-item-title>
                    {{ user.fullName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.username }}
                  </v-list-item-subtitle>
                  <div v-if="expanded === i">
                    <p v-for="[key,value] in Object.entries(user)" v-bind:key="key"
                       class="mb-0">
                      {{ key }}: {{ value }}
                    </p></div>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn text @click="makeMember(user)">
                    Make member
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider/>
            </div>
          </div>
        </v-list>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "MemberManager",
  components: {TopBanner},
  data: () => ({
    users: [],
    expanded: null,
    search: '',
  }),
  mounted() {
    this.$http.get('/users', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => this.users = response.data)
  },
  methods: {
    isSearched(user) {
      return user.fullName.toLowerCase().includes(this.search) || user.username.toLowerCase().includes(this.search)
    },
    makeMember(user) {
      this.$http.post(`/users/${user.id}/member?isMember=true`, {}, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(() =>
              this.$http.get('/users', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
                  .then(response => this.users = response.data))
    },
  }

}
</script>

<style scoped>

</style>
