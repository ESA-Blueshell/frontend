<template>
  <v-main>
    <top-banner title="Member Manager" />

    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <v-text-field
          v-model="search"
          label="Search for a user"
        />

        <p class="text-h3">
          Non-member users ({{ users.filter(u => !u.roles.includes('MEMBER')).length }})
        </p>
        <v-list>
          <div
            v-for="(user) in users"
            :key="user.username"
          >
            <div v-if="!user.roles.includes('MEMBER') && isSearched(user)">
              <v-list-item>
                <div @click="expanded = (expanded === user.id) ? null : user.id">
                  <v-list-item-title>
                    {{ user.fullName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.username }}
                  </v-list-item-subtitle>
                  <v-expand-transition>
                    <div v-if="expanded === user.id">
                      <p
                        v-for="[key,value] in Object.entries(user)"
                        :key="key"
                        class="mb-0 memberinfo"
                      >
                        <span>{{ key }}</span>: {{ toReadableString(value) }}
                      </p>
                    </div>
                  </v-expand-transition>
                </div>
                <template #append>
                  <v-btn
                    variant="text"
                    @click="changeMembership(user, true)"
                  >
                    Make member
                  </v-btn>
                </template>
              </v-list-item>
              <v-divider />
            </div>
          </div>
        </v-list>

        <!--        Sick copy paste to show members -->
        <p class="text-h3">
          Members ({{ users.filter(u => u.roles.includes('MEMBER')).length }})
        </p>
        <v-list>
          <div
            v-for="(user) in users"
            :key="user.username"
          >
            <div v-if="user.roles.includes('MEMBER') && isSearched(user)">
              <v-list-item>
                <div @click="expanded = (expanded === user.id) ? null : user.id">
                  <v-list-item-title>
                    {{ user.fullName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.username }}
                  </v-list-item-subtitle>
                  <v-expand-transition>
                    <div v-if="expanded === user.id">
                      <p
                        v-for="[key,value] in Object.entries(user)"
                        :key="key"
                        class="mb-0 memberinfo"
                      >
                        <span>{{ key }}</span>: {{ toReadableString(value) }}
                      </p>
                    </div>
                  </v-expand-transition>
                </div>

                <template #append>
                  <v-btn
                    :disabled="user.roles.indexOf('BOARD') !== -1 || user.roles.indexOf('ADMIN') !== -1"
                    variant="text"
                    @click="changeMembership(user, false)"
                  >
                    Remove membership
                  </v-btn>
                </template>
              </v-list-item>
              <v-divider />
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
      .catch(e => this.$root.handleNetworkError(e))
  },
  methods: {
    isSearched(user) {
      return user.fullName.toLowerCase().includes(this.search) || user.username.toLowerCase().includes(this.search)
    },
    changeMembership(user, isMember) {
      this.$http.post(`/users/${user.id}/member?isMember=${isMember}`, {}, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() =>
          this.$http.get('/users', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
            .then(response => this.users = response.data)
            .catch(e => this.$root.handleNetworkError(e)))
        .catch(e => this.$root.handleNetworkError(e))
    },
    toReadableString(value) {
      if (value === [] || value === '[]') {
        return 'None';
      }

      if (value === false) {
        return 'No';
      }

      if (value === true) {
        return 'Yes';
      }

      if (value == null) {
        return '';
      }

      if (typeof (value) === 'string' && value.includes('+') && value.includes('T')) {
        // Probably a time value
        return new Date(value);
      }

      return value;
    },
  }

}
</script>

<style scoped>
.memberinfo {
  margin: 4px;
}

span {
  font-weight: bold;
}

</style>
