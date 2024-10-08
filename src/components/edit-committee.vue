<template>
  <!--

  -->
  <v-form
    v-if="editingCommittee"
    ref="form"
    v-model="valid"
  >
    <v-text-field
      ref="title"
      v-model="editingCommittee.name"
      :rules="[v => !!v || 'name is required']"
      label="Committee name"
      required
    />

    <v-textarea
      ref="description"
      v-model="editingCommittee.description"
      :rules="[v => !!v || 'Description is required']"
      label="Description"
      variant="outlined"
      hide-details
      required
    />

    <v-container>
      <v-row
        v-for="(member,i) in editingCommittee.members"
        :key="i"
        dense
      >
        <v-col cols="4">
          <v-text-field
            v-model="member.role"
            hide-details="auto"
            label="Role"
          />
        </v-col>
        <v-col cols="8">
          <v-autocomplete
            v-if="memberSelectItems"
            v-model="member.user"
            :item-title="user => user.discord ? `${user.fullName} (${user.discord})` : user.fullName"
            :items="memberSelectItems"
            :rules="[v => !!v || 'Select a member',
                     v => (!!v && editingCommittee.members.filter(member => member.user && member.user.username === v.username).length === 1) || 'A member can\'t be in the same committee twice']"
            hide-details="auto"
            auto-select-first
            clearable
            hide-no-data
            label="Member name"
            return-object
          >
            <template #append>
              <v-btn
                icon="mdi-close"
                variant="plain"
                @click="editingCommittee.members.splice(i,1)"
              />
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      block
      variant="outlined"
      class="mb-4"
      @click="addMember"
    >
      Add member
    </v-btn>

    <v-btn
      block
      @click="submit"
    >
      Save committee
    </v-btn>
  </v-form>
</template>

<script>
import {$handleNetworkError} from "@/plugins/handleNetworkError";

export default {
  name: "EditCommittee",
  props: {
    committee: {
      type: Object,
      default: () => null,
    },
  },
  data: () => ({
    valid: false,
    users: [],
    memberSelectItems: null,
    editingCommittee: null,
  }),
  mounted() {
    this.$http.get('users/members', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
      .then(response => this.memberSelectItems = response.data)
      .catch(e => $handleNetworkError(e))

    if (this.committee) {
      this.editingCommittee = JSON.parse(JSON.stringify(this.committee));
    } else {
      this.editingCommittee = {
        name: '',
        description: '',
        members: [],
      }
    }
  },
  methods: {
    addMember() {
      this.editingCommittee.members.push({role: '', user: null})
    },
    async submit() {
      const {valid} = await this.$refs.form.validate()

      if (!valid) {
        return;
      }

      this.$emit('submitting')

      if (!this.committee) {
        this.$http.post('committees',
          JSON.stringify(this.editingCommittee),
          {
            headers: {
              'Authorization': `Bearer ${this.$store.getters.getLogin.token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(() => this.$emit('close'))
          .catch(e => $handleNetworkError(e))
      } else {
        this.$http.put('committees/' + this.editingCommittee.id,
          JSON.stringify(this.editingCommittee),
          {
            headers: {
              'Authorization': `Bearer ${this.$store.getters.getLogin.token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(() => this.$emit('close'))
          .catch(e => $handleNetworkError(e))
      }
    },
  },
}
</script>
