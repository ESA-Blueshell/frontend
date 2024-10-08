<template>
  <v-main>
    <top-banner title="Member Manager"/>

    <v-dialog
      v-model="showAddPeriodDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Edit Contribution Period' : 'Add Contribution Period' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  ref="startDate"
                  v-model="form.startDate"
                  label="Start Date"
                  :rules="startDateRules()"
                  type="date"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  ref="endDate"
                  v-model="form.endDate"
                  label="End Date"
                  :rules="endDateRules()"
                  type="date"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model.number="form.halfYearFee"
              label="Half Year Fee"
              type="number"
              :rules="feeRules"
            />
            <v-text-field
              v-model.number="form.fullYearFee"
              label="Full Year Fee"
              type="number"
              :rules="feeRules"
            />
            <v-text-field
              v-model.number="form.alumniFee"
              label="Alumni Fee"
              type="number"
              :rules="feeRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <!-- Delete Button (Visible in Edit Mode) -->
          <v-btn
            v-if="isEditing"
            color="red"
            @click="confirmDeletePeriod"
          >
            Delete
          </v-btn>
          <!-- Save/Create Button -->
          <v-btn
            color="primary"
            @click="saveContributionPeriod"
          >
            {{ isEditing ? 'Save' : 'Create' }}
          </v-btn>
          <v-btn @click="closePeriodDialog">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deletePeriodDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
          Confirm Period Deletion
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete the contribution period from <strong>{{ formatPeriod(selectedPeriod) }}
        </strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="red"
            @click="deleteContributionPeriod"
          >
            Delete
          </v-btn>
          <v-btn @click="deletePeriodDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
          Confirm User Deletion
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete <strong>{{ selectedUser.fullName }}</strong> ({{ selectedUser.username }})?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="red"
            @click="confirmDeleteUser()"
          >
            Delete
          </v-btn>
          <v-btn @click="deleteDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 1000px"
      >
        <p class="text-h3">
          Contribution Periods
        </p>
        <v-row class="d-flex align-center mb-4">
          <v-col
            cols="11"
          >
            <v-slide-group
              v-model="selectedPeriodId"
              show-arrows
              center-active
              mandatory
              selected-class="bg-primary"
            >
              <v-slide-group-item
                v-for="period in contributionPeriods"
                :key="period.id"
                v-slot="{ toggle, selectedClass }"
                :value="period.id"
              >
                <div
                  @mouseover="hoveredPeriodId = period.id"
                  @mouseleave="hoveredPeriodId = null"
                >
                  <v-btn
                    :class="['mr-2', selectedClass]"
                    class="mr-2"
                    @click="toggle"
                  >
                    {{ formatPeriod(period) }}
                    <v-icon
                      v-if="hoveredPeriodId === period.id"
                      class="edit-icon"
                      style="padding-left: 10px"
                      @click.stop="openEditPeriodDialog(period)"
                    >
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </div>
              </v-slide-group-item>
            </v-slide-group>
          </v-col>
          <v-col
            cols="1"
          >
            <v-btn
              icon
              cols="2"
              class="ml-auto"
              @click="openAddPeriodDialog()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-text-field
          v-model="search"
          label="Search for a user"
          @update:model-value="updateMembers"
        />

        <p class="text-h3">
          Non-member users ({{ nonMembers.length }})
        </p>
        <v-list>
          <div
            v-for="(user) in nonMembers"
            :key="user.username"
          >
            <div>
              <v-list-item>
                <div
                  class="d-flex justify-space-between align-center"
                  style="width: 100%;"
                  @click="toggleExpanded(user)"
                >
                  <!-- Title and Subtitle Section -->
                  <div class="flex-grow-1">
                    <v-list-item-title>
                      {{ user.fullName }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ user.username }}
                    </v-list-item-subtitle>
                  </div>

                  <div
                    class="d-flex align-center"
                    style="flex-shrink: 0;"
                  >
                    <v-btn
                      :disabled="user.roles.indexOf('ADMIN') !== -1"
                      color="red"
                      variant="text"
                      @click.stop="deleteUser(user)"
                    >
                      Delete User
                    </v-btn>

                    <v-btn
                      :disabled="user.roles.indexOf('BOARD') !== -1 || user.roles.indexOf('ADMIN') !== -1"
                      variant="text"
                      @click.stop="changeMembership(user, true)"
                    >
                      Make member
                    </v-btn>
                  </div>
                </div>

                <v-expand-transition>
                  <div v-if="expanded === user.id">
                    <p
                      v-for="[key, value] in Object.entries(user)"
                      :key="key"
                      class="mb-0 memberinfo"
                    >
                      <span>{{ key }}</span>: {{ toReadableString(value) }}
                    </p>
                  </div>
                </v-expand-transition>
              </v-list-item>
              <v-divider/>
            </div>
          </div>
        </v-list>

        <!--        Sick copy paste to show members -->
        <p class="text-h3">
          Members ({{ members.length }})
        </p>
        <v-list>
          <div
            v-for="(user) in members"
            :key="user.username"
          >
            <div>
              <v-list-item>
                <div
                  class="d-flex justify-space-between align-center"
                  style="width: 100%;"
                  @click="toggleExpanded(user)"
                >
                  <!-- Title and Subtitle Section -->
                  <div class="flex-grow-1">
                    <v-list-item-title>
                      {{ user.fullName }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ user.username }}
                    </v-list-item-subtitle>
                  </div>

                  <!-- Contribution Paid, Online Sign-Up, Make Member Section -->
                  <div
                    class="d-flex align-center"
                    style="flex-shrink: 0;"
                  >
                    <div class="d-flex align-center mr-4">
                      <span class="mr-2">Brevo</span>
                      <v-icon
                        v-if="user.inBrevo"
                        color="green"
                        class="mr-4"
                      >
                        mdi-check
                      </v-icon>
                      <v-icon
                        v-else
                        color="red"
                        class="mr-4"
                        @click.stop="addToBrevo(user)"
                      >
                        mdi-close
                      </v-icon>
                    </div>
                    <div class="d-flex align-center mr-4"
                         v-if="selectedPeriodId"
                    >
                      <span class="mr-2">Contribution Paid</span>
                      <v-icon
                        v-if="contribution(user)?.paid"
                        color="green"
                        class="mr-4 hover-shadow"
                        title="Mark as unpaid"
                        @click.stop="changeContributionPaid(user, false)"
                      >
                        mdi-check
                      </v-icon>
                      <v-icon
                        v-else
                        color="red"
                        class="mr-4 hover-shadow"
                        title="Mark as paid"
                        @click.stop="changeContributionPaid(user, true)"
                      >
                        mdi-close
                      </v-icon>
                    </div>

                    <div class="d-flex align-center mr-4">
                      <span class="mr-2">Online Sign-Up</span>
                      <v-icon
                        v-if="user.onlineSignup"
                        color="green"
                        class="mr-4"
                      >
                        mdi-check
                      </v-icon>
                      <v-icon
                        v-else
                        color="red"
                        class="mr-4"
                      >
                        mdi-close
                      </v-icon>
                    </div>

                    <v-btn
                      :disabled="user.roles.indexOf('BOARD') !== -1 || user.roles.indexOf('ADMIN') !== -1"
                      variant="text"
                      @click.stop="changeMembership(user, false)"
                    >
                      Remove membership
                    </v-btn>
                  </div>
                </div>

                <v-expand-transition>
                  <div v-if="expanded === user.id">
                    <p
                      v-for="[key, value] in Object.entries(user)"
                      :key="key"
                      class="mb-0 memberinfo"
                    >
                      <span>{{ key }}</span>: {{ toReadableString(value) }}
                    </p>
                  </div>
                </v-expand-transition>
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
import {$handleNetworkError} from "@/plugins/handleNetworkError";
import moment from "moment";

export default {
  name: "MemberManager",
  components: {TopBanner},
  data: () => ({
    members: [],
    nonMembers: [],
    users: [],
    contributionPeriods: [],
    selectedPeriodId: null,
    hoveredPeriodId: null,
    contributionPeriod: {},
    expanded: null,
    search: '',
    deleteDialog: false,
    deletePeriodDialog: false,
    selectedPeriod: null,
    selectedUser: null,
    scrollPosition: 0,
    isEditing: false,
    form: {
      startDate: '',
      endDate: '',
      halfYearFee: null,
      fullYearFee: null,
      alumniFee: null,
    },
    feeRules: [value => (value !== null && value !== '') || 'Fee is required'],
    showAddPeriodDialog: false,
  }),
  mounted() {
    this.getContributionPeriods()
  },
  methods: {
    startDateRules() {
      return [
        (value) => !!value || 'Start Date is required',
        (value) => this.isValidStartDate(value) || 'Start date must be before end date',
        (value) => this.doesNotOverlap(value, this.form.endDate) || 'The period overlaps with an existing contribution period',
      ];
    },
    endDateRules() {
      return [
        (value) => !!value || 'End Date is required',
        (value) => this.isValidEndDate(value) || 'End date must be after start date',
        (value) => this.doesNotOverlap(this.form.startDate, value) || 'The period overlaps with an existing contribution period',
      ];
    },
    formatPeriod(period) {
      if (!period) {
        return ''
      }
      const start = moment(period.startDate).format('DD/MM/YYYY');
      const end = moment(period.endDate).format('DD/MM/YYYY');
      return `${start} - ${end}`;
    },
    async getContributionPeriods() {
      await this.$http.get('/contributionPeriods', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.contributionPeriods = response.data;
          if (this.contributionPeriods.length && !this.selectedPeriodId) {
            this.selectedPeriodId = this.contributionPeriods.at(-1).id;
          }
          this.getUsers();
        })
        .catch(e => $handleNetworkError(e))
    },
    async getUsers() {
      await this.$http.get('/users', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.users = response.data;
          this.updateMembers();
        })
        .catch(e => $handleNetworkError(e))
    },
    isSearched(user) {
      return user.fullName.toLowerCase().includes(this.search) || user.username.toLowerCase().includes(this.search)
    },
    changeMembership(user, isMember) {
      this.$http.post(`/users/${user.id}/member?isMember=${isMember}`, {}, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => this.getUsers())
        .catch(e => $handleNetworkError(e))
    },
    contribution(user) {
      return user.contributions.find((c) => c.contributionPeriod.id === this.selectedPeriodId);
    },
    changeContributionPaid(user, paid) {
      const contributionId = this.contribution(user).id
      this.$http.post(`/contributions/${contributionId}?paid=${paid}`, {}, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => this.getUsers())
        .catch(e => $handleNetworkError(e))
    },
    addToBrevo(user) {
      this.$http.put(`/users/${user.id}/addToBrevo`, {}, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => this.getUsers())
        .catch(e => $handleNetworkError(e))
    },
    deleteUser(user) {
      this.selectedUser = user; // Store the user to be deleted
      this.deleteDialog = true; // Open the dialog
    },
    confirmDeleteUser() {
      this.deleteDialog = false;
      this.$http.delete(`/users/${this.selectedUser.id}`, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => this.getUsers())
        .catch(e => $handleNetworkError(e))
    },
    updateMembers() {
      this.members = this.users.filter((user) => user.roles.includes('MEMBER') && this.isSearched(user))
      this.nonMembers = this.users.filter((user) => !user.roles.includes('MEMBER') && this.isSearched(user))
    },
    // Open Add Contribution Period Dialog
    openAddPeriodDialog() {
      this.isEditing = false;
      this.selectedPeriod = null;
      this.form = {
        startDate: '',
        endDate: '',
        halfYearFee: null,
        fullYearFee: null,
        alumniFee: null,
      };
      this.showAddPeriodDialog = true;
    },
    // Open Edit Contribution Period Dialog
    openEditPeriodDialog(period) {
      this.isEditing = true;
      this.selectedPeriod = period;
      this.form = {
        startDate: moment(period.startDate).format('YYYY-MM-DD'),
        endDate: moment(period.endDate).format('YYYY-MM-DD'),
        halfYearFee: period.halfYearFee,
        fullYearFee: period.fullYearFee,
        alumniFee: period.alumniFee,
      };
      this.showAddPeriodDialog = true;
    },
    closePeriodDialog() {
      this.showAddPeriodDialog = false;
      this.isEditing = false;
      this.selectedPeriod = null;
      // Reset form
      this.form = {
        startDate: '',
        endDate: '',
        halfYearFee: null,
        fullYearFee: null,
        alumniFee: null,
      };
    },
    // Save (Create or Update) Contribution Period
    async saveContributionPeriod() {
      const {valid} = await this.$refs.formRef.validate();

      if (!valid) {
        return;
      }

      if (this.isEditing) {
        // Update existing period
        await this.$http
          .put(`/contributionPeriods/${this.selectedPeriod.id}`, this.form, {
            headers: {Authorization: `Bearer ${this.$store.getters.getLogin.token}`},
          })
          .then(() => {
            this.getContributionPeriods();
            this.closePeriodDialog();
          })
          .catch((e) => $handleNetworkError(e));
      } else {
        // Create new period
        await this.$http
          .post('/contributionPeriods', this.form, {
            headers: {Authorization: `Bearer ${this.$store.getters.getLogin.token}`},
          })
          .then(() => {
            this.getContributionPeriods();
            this.closePeriodDialog();
          })
          .catch((e) => $handleNetworkError(e));
      }
    },
    // Confirm Delete Period
    confirmDeletePeriod() {
      this.deletePeriodDialog = true;
      this.showAddPeriodDialog = false;
    },
    // Delete Contribution Period
    deleteContributionPeriod() {
      this.deletePeriodDialog = false;
      this.$http
        .delete(`/contributionPeriods/${this.selectedPeriod.id}`, {
          headers: {Authorization: `Bearer ${this.$store.getters.getLogin.token}`},
        })
        .then(() => {
          this.isEditing = false;
          this.selectedPeriod = null;
          this.selectedPeriodId = null;
          this.getContributionPeriods();
        })
        .catch((e) => $handleNetworkError(e));
    },
    toReadableString(value) {
      if (value == [] || value === '[]') {
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
    toggleExpanded(user) {
      if (user.id === this.expanded) {
        this.expanded = null;
      } else {
        this.expanded = user.id;
      }
    },
    isValidStartDate(value) {
      if (!this.form.endDate) {
        return true; // Can't compare yet
      }
      return moment(value).isBefore(moment(this.form.endDate));
    },
    isValidEndDate(value) {
      if (!this.form.startDate) {
        return true; // Can't compare yet
      }
      return moment(value).isAfter(moment(this.form.startDate));
    },
    doesNotOverlap(startDate, endDate) {
      if (!startDate || !endDate) {
        return true; // Can't check yet
      }
      const newStart = moment(startDate);
      const newEnd = moment(endDate);

      for (let period of this.contributionPeriods) {
        // Skip the current period if editing
        if (this.isEditing && period.id === this.selectedPeriod.id) {
          continue;
        }
        const existingStart = moment(period.startDate);
        const existingEnd = moment(period.endDate);

        // Check for overlap
        if (newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart)) {
          // Overlap detected
          return false;
        }
      }
      return true; // No overlap
    },
  },
}
</script>

<style scoped>
.memberinfo {
  margin: 4px;
}

span {
  font-weight: bold;
}

.hover-shadow {
  transition: 0.3s ease-in-out;
}

.hover-shadow:hover {
  box-shadow: 0 4px 8px rgba(186, 181, 181, 0.2);
  border-radius: 50%;
}

</style>
