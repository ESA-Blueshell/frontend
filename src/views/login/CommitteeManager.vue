<template>
  <v-main>
    <top-banner title="Committee Manager" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <v-btn
          :loading="creatingLoading"
          block
          :variant="creatingCommittee ? 'outlined' : ''"
          @click="creatingCommittee = !creatingCommittee"
        >
          {{ creatingCommittee ? 'Stop creating committee' : 'Create new committee' }}
        </v-btn>

        <v-expand-transition>
          <div
            v-if="creatingCommittee"
            class="form-border mx-auto rounded-b-xl"
            style="border-top-width: 0"
          >
            <edit-committee
              class="form"
              new-committee
              @close="getCommittees();creatingCommittee=false;creatingLoading=false;"
              @submitting="creatingLoading=true"
            />
          </div>
        </v-expand-transition>


        <v-dialog
          max-width="400"
          :model-value="committeeToDelete"
        >
          <template #activator="{ on: dialog, attrs }">
            <v-list :lines="'two'">
              <div
                v-for="(committee,i) in committees"
                :key="committee.name"
              >
                <v-list-item :key="committee.name">
                  <v-list-item-title class="text-h6">
                    {{ committee.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ committee.members.length }} member{{ committee.members.length === 1 ? '' : 's' }}
                  </v-list-item-subtitle>

                  <v-list-item-action>
                    <v-tooltip location="left">
                      <template #activator="{ on }">
                        <v-btn
                          :loading="submittingId === committee.id"
                          icon
                          @click="editingCommitteeId= (editingCommitteeId===committee.id ? null : committee.id)"
                          v-on="on"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit committee</span>
                    </v-tooltip>
                    <v-tooltip
                      v-if="$store.getters.isBoard"
                      location="left"
                    >
                      <template #activator="{ on: tooltip }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          @click="committeeToDelete = committee"
                          v-on="{ ...tooltip, ...dialog }"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Delete committee</span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>

                <v-expand-transition :key="committee.name">
                  <div
                    v-if="editingCommitteeId === committee.id"
                    class="form-border mx-auto rounded-b-xl"
                  >
                    <edit-committee
                      :committee="committee"
                      class="form"
                      @close="editingCommitteeId=null;submittingId=null"
                      @submitting="submittingId=committee.id"
                    />
                  </div>
                </v-expand-transition>

                <v-divider
                  v-if="i < committees.length - 1 && editingCommitteeId !== committee.id"
                  :key="i"
                />
              </div>
            </v-list>
          </template>


          <v-card>
            <v-card-title>
              <span class="text-h5">
                Are you sure you want to delete this committee:
                {{ committeeToDelete ? committeeToDelete.name : '' }}
              </span>
            </v-card-title>
            <v-card-text>
              There will be no undo
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                variant="text"
                @click="committeeToDelete=null"
              >
                No
              </v-btn>
              <v-btn
                color="red"
                variant="text"
                @click="deleteCommittee"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-img
          v-if="noCommittees"
          :src="require('../../assets/noCommittees.jpg')"
        />
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";
import EditCommittee from "@/components/edit-committee";

export default {
  name: "CommitteeManager",
  components: {EditCommittee, TopBanner},
  data: () => ({
    committees: [],
    committeeToDelete: null,
    editingCommitteeId: null,
    submittingId: null,
    creatingCommittee: false,
    creatingLoading: false,
    noCommittees: false,
  }),
  mounted() {
    // Get the user's committees
    this.getCommittees()
  },
  methods: {
    getCommittees() {
      this.$http.get('committees?fullCommittees=true', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          if (response.data.length > 0) {
            this.committees = response.data
          } else {
            this.noCommittees = true
          }
        })
        .catch(e => this.$root.handleNetworkError(e))
    },
    deleteCommittee() {
      this.$http.delete('committees/' + this.committeeToDelete.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          if (response.status === 200) {
            this.committees = this.committees.filter(committee => committee.id !== this.committeeToDelete.id)
            this.committeeToDelete = null
          }
        })
        .catch(e => this.$root.handleNetworkError(e))
    },
  },
}
</script>

<style scoped>

.form-border {
  border-width: 1px;
  border-color: var(--v-accent-base);
  border-style: solid;
}

.form {
  padding: 16px;
}
</style>
