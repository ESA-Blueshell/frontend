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
            <!--            SHOW WHETHER THE ACCOUNT IS ACTIVE      -->
            <div
              v-if="managerType === 'member' || managerType === 'admin'"
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

            <template v-if="isMemberList">
              <!--            REMOVE MEMBERSHIP FROM A USER       -->
              <v-btn
                v-if="managerType === 'member'"
                variant="text"
                @click.stop="changeMembership(true)"
              >
                Make member
              </v-btn>
            </template>
            <template v-else>
              <!--              MAKE CONTRIBUTION NOT PAID      as-->
              <v-btn
                v-if="managerType === 'contribution'"
                @click.stop="changeContributionPaid(false)"
              />
              <!--            DELETE A USER       -->
              <v-btn
                v-if="managerType === 'member' || managerType === 'admin'"
                :disabled="user.roles.indexOf('ADMIN') !== -1"
                color="red"
                variant="text"
                @click.stop="deleteUser()"
              >
                Delete
              </v-btn>
              <!--            MAKE A USER A MEMBER       -->
              <v-btn
                v-if="managerType === 'member'"
                variant="text"
                @click.stop="changeMembership(false)"
              >
                Remove member
              </v-btn>
            </template>
          </div>
        </div>

        <v-expand-transition v-if="managerType === 'admin'">
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
      </div>
    </v-list-item>
  </div>
</template>
<script lang="ts">
import UserComponent from '@/components/UserComponent.vue';
import UserService from "@/services/UserService";
import ContributionService from "@/services/ContributionService";
import type UserModel from "@/models/UserModel";
import type ContributionModel from "@/models/ContributionModel";
import {computed, ref, toRefs} from 'vue';
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
    managerType: {
      type: String,
      required: true,
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
