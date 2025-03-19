<template>
  <div>
    <v-list-item>
      <div
        class="d-flex justify-space-between align-center"
        style="width: 100%;"
        @click="toggleExpanded()"
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

        <!-- Action Buttons -->
        <div
          class="d-flex align-center"
          style="flex-shrink: 0;"
        >
          <div
            class="d-flex align-center"
          >
            <!--            SHOW WHETHER THE ACCOUNT IS ACTIVE      -->
            <div
              class="d-flex align-center mr-4"
            >
              <span class="mr-2">Enabled</span>
              <v-icon
                v-if="user.enabled"
                color="green"
                class="mr-2"
              >
                mdi-check
              </v-icon>
              <v-icon
                v-else
                color="red"
                class="mr-2"
              >
                mdi-close
              </v-icon>
            </div>

            <template v-if="!isMemberList">
              <!--            DELETE A USER       -->
              <v-btn
                :disabled="user.roles.indexOf('ADMIN') !== -1"
                color="red"
                variant="text"
                @click.stop="deleteUser()"
              >
                Delete
              </v-btn>
            </template>
            <template v-else>
              <!--              CHANGE CONTRIBUTION PAID      as-->
              <div
                v-if="contribution"
                class="d-flex align-center mr-4"
              >
                <span class="mr-2">Paid</span>
                <v-icon
                  v-if="contribution.paid"
                  color="green"
                  class="mr-2"
                  @click.stop="changeContributionPaid(false)"
                >
                  mdi-check
                </v-icon>
                <v-icon
                  v-else
                  color="red"
                  class="mr-2"
                  @click.stop="changeContributionPaid(true)"
                >
                  mdi-close
                </v-icon>
              </div>
            </template>
            <!--            TOGGLE MEMBERSHIP       -->
            <v-btn
              variant="text"
              @click.stop="toggleMembership()"
            >
              {{ user.roles.includes(Role.MEMBER) ? "Remove membership" : "Make member" }}
            </v-btn>
          </div>
        </div>
      </div>
      <v-expand-transition>
        <div v-if="expanded === user.id">
          <UserComponent
            class="mt-4"
            :user="user"
            @user-changed="userChanged"
          />
        </div>
      </v-expand-transition>
    </v-list-item>
  </div>

  <delete-confirmation-dialog
    v-model="deleteDialog"
    title="Confirm User Deletion"
    :message="`Are you sure you want to delete ${user.fullName} (${user.username})?`"
    @confirm="confirmDeleteUser"
  />
</template>
<script lang="ts">
import UserComponent from '@/components/UserComponent.vue';
import UserService from "@/services/UserService.ts";
import ContributionService from "@/services/ContributionService.ts";
import type ContributionModel from "@/models/ContributionModel";
import {computed, ref, toRefs} from 'vue';
import DeleteConfirmationDialog from "@/components/DeletionConfirmationDialog.vue";
import store from "@/plugins/store.ts";
import {type AdvancedUser, Role} from "@/models";

export default {
  name: 'UserListRow',
  components: {UserComponent, DeleteConfirmationDialog},
  props: {
    user: {
      type: Object as () => AdvancedUser,
      required: true,
    },
    contributions: {
      type: Array as () => ContributionModel[],
      default: () => [],
    },
    expanded: {
      type: Number,
      default: null,
    },
    isMemberList: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle-expanded', 'user-changed', 'contribution-changed', 'delete-user'],
  setup(props, {emit}) {
    const roles = store.getters.getLogin?.roles;
    const disableDelete = !roles || !roles.includes('ADMIN');
    const deleteDialog = ref(false);
    const userService: UserService = new UserService();
    const contributionService: ContributionService = new ContributionService();
    const {user, contributions} = toRefs(props);

    const toggleExpanded = () => {
      emit('toggle-expanded', props.user.id);
    };

    const toggleMembership = async () => {
      const userData: AdvancedUser = await userService.toggleRole(user.value.id as number, Role.MEMBER);
      userChanged(userData)
    };

    const deleteUser = () => {
      deleteDialog.value = true;
    };

    const confirmDeleteUser = async () => {
      deleteDialog.value = false;
      await userService.deleteUser(props.user.id as number);
      emit('delete-user', props.user);
    };

    const addToBrevo = async () => {
      const userData: AdvancedUser = await userService.syncWithBrevo(user.value);
      userChanged(userData)
    };

    const userChanged = (userData: AdvancedUser) => {
      console.error("USER CHANGED IN USER LIST ROW")
      emit('user-changed', userData);
    }

    const contribution = computed(() => {
      return contributions.value.find((c) => c.userId === user.value.id);
    });

    const changeContributionPaid = async (paid: boolean) => {
      if (contribution.value) {
        const changedContribution = await contributionService.markAsPaid(contribution.value.id as number, paid)
        emit('contribution-changed', changedContribution);
      }
    };

    return {
      deleteDialog,
      contribution,
      deleteUser,
      confirmDeleteUser,
      toggleExpanded,
      toggleMembership,
      changeContributionPaid,
      addToBrevo,
      disableDelete,
      userChanged,
      Role
    };
  },
}
</script>

<style scoped>
span {
  font-weight: bold;
}
</style>
