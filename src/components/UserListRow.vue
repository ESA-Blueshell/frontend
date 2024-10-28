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
            v-if="isMemberList"
            class="d-flex align-center"
          >
            <!-- Member Actions -->
            <div class="d-flex align-center mr-4">
              <span class="mr-2">Brevo</span>
              <v-icon
                v-if="user.inBrevo"
                color="green"
                class="mr-2"
              >
                mdi-check
              </v-icon>
              <v-icon
                v-else
                color="red"
                class="mr-2"
                @click.stop="addToBrevo()"
              >
                mdi-close
              </v-icon>
            </div>

            <div
              v-if="contribution"
              class="d-flex align-center mr-4"
            >
              <span class="mr-2">Contribution Paid</span>
              <v-icon
                v-if="contribution.paid"
                color="green"
                class="mr-2 hover-shadow"
                title="Mark as unpaid"
                @click.stop="changeContributionPaid(false)"
              >
                mdi-check
              </v-icon>
              <v-icon
                v-else
                color="red"
                class="mr-2 hover-shadow"
                title="Mark as paid"
                @click.stop="changeContributionPaid(true)"
              >
                mdi-close
              </v-icon>
            </div>

            <div class="d-flex align-center mr-4">
              <span class="mr-2">Online Sign-Up</span>
              <v-icon
                v-if="user.onlineSignup"
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

            <v-btn
              :disabled="user.roles.includes('BOARD') || user.roles.includes('ADMIN')"
              variant="text"
              @click.stop="changeMembership(false)"
            >
              Remove membership
            </v-btn>
          </div>
          <div v-else>
            <!-- Non-member Actions -->
            <v-btn
              v-if="!disableDelete"
              color="red"
              variant="text"
              @click.stop="deleteUser()"
            >
              Delete User
            </v-btn>

            <v-btn
              :disabled="user.roles.includes('BOARD') || user.roles.includes('ADMIN')"
              variant="text"
              @click.stop="changeMembership(true)"
            >
              Make member
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

      <delete-confirmation-dialog
        v-model="deleteDialog"
        title="Confirm User Deletion"
        :message="`Are you sure you want to delete ${user.fullName} (${user.username})?`"
        @confirm="confirmDeleteUser"
      />
    </v-list-item>
  </div>
</template>
<script lang="ts">
import UserComponent from '@/components/UserComponent.vue';
import UserService from "@/services/UserService";
import ContributionService from "@/services/ContributionService";
import type UserModel from "@/models/UserModel";
import type ContributionModel from "@/models/ContributionModel";
import { computed, ref, toRefs } from 'vue';
import DeleteConfirmationDialog from "@/components/DeletionConfirmationDialog.vue";
import store from "@/plugins/store";

export default {
  name: 'UserListRow',
  components: {UserComponent, DeleteConfirmationDialog},
  props: {
    user: {
      type: Object as () => UserModel,
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
  setup(props, { emit }) {
    const roles = store.getters.getLogin?.roles;
    const disableDelete = !roles || !roles.includes('ADMIN');
    const deleteDialog = ref(false);
    const userService: UserService = new UserService();
    const contributionService: ContributionService = new ContributionService();
    const { user, contributions } = toRefs(props);

    const toggleExpanded = () => {
      emit('toggle-expanded', props.user);
    };

    const changeMembership = async (isMember: boolean) => {
      const userData: UserModel = await userService.setMembership(user.value, isMember);
      userChanged(userData)
    };

    const deleteUser = () => {
      deleteDialog.value = true;
    };

    const confirmDeleteUser = async () => {
      deleteDialog.value = false;
      await userService.delete(props.user);
      emit('delete-user', props.user);
    };

    const addToBrevo = async () => {
      const userData: UserModel = await userService.syncWithBrevo(user.value);
      userChanged(userData)
    };

    const userChanged = (userData: UserModel) => {
      console.error("USER CHANGED IN USER LIST ROW")
      emit('user-changed', userData);
    }

    const contribution = computed(() => {
      return contributions.value.find((c) => c.userId === user.value.id);
    });

    const changeContributionPaid = async (paid: boolean) => {
      if (contribution.value) {
        const changedContribution = await contributionService.changeContributionPaid(contribution.value, paid)
        emit('contribution-changed', changedContribution);
      }
    };

    return {
      deleteDialog,
      contribution,
      deleteUser,
      confirmDeleteUser,
      toggleExpanded,
      changeMembership,
      changeContributionPaid,
      addToBrevo,
      disableDelete,
      userChanged,
    };
  },
}
</script>

<style scoped>
span {
  font-weight: bold;
}
</style>
