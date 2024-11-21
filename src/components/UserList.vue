<template>
  <div>
    <p class="text-h3">
      {{ title }} ({{ users.length }})
    </p>
    <v-list class="mt-3">
      <!-- Add New User Row -->
      <div v-if="showMemberFields">
        <v-list-item @click="toggleExpanded(-1)">
          <div
            class="d-flex justify-space-between align-center"
            style="width: 100%;"
          >
            <v-list-item-title>Add Member</v-list-item-title>
            <v-icon>mdi-plus</v-icon>
          </div>
        </v-list-item>
        <v-expand-transition v-if="showAdminFields">
          <div v-if="expanded === -1">
            <UserComponent
              class="mt-4"
              @user-changed="userChanged"
            />
          </div>
        </v-expand-transition>
        <v-divider />
      </div>
      <!-- Existing Users -->
      <div
        v-for="user in users"
        :key="user.username"
      >
        <UserListRow
          :user="user"
          :expanded="expanded"
          :is-member-list="showMemberFields"
          :contributions="contributions"
          @toggle-expanded="toggleExpanded"
          @contribution-changed="contributionChanged"
          @user-changed="userChanged"
          @delete-user="deleteUser"
        />
        <v-divider />
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import UserListRow from './UserListRow.vue';
import type ContributionModel from "@/models/ContributionModel";
import type UserModel from "@/models/UserModel";
import UserComponent from "@/components/UserComponent.vue";

export default {
  name: 'UserList',
  components: {UserComponent, UserListRow},
  props: {
    title: {
      type: String,
      required: true,
    },
    contributions: {
      type: Array as () => ContributionModel[],
      default: () => [],
    },
    users: {
      type: Array as () => UserModel[],
      default: () => [],
    },
    expanded: {
      type: Number,
      default: null,
    },
    showMemberFields: {
      type: Boolean,
      default: false,
    },
    showContributionFields: {
      type: Boolean,
      default: false,
    },
    showAdminFields: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'toggle-expanded',
    'user-changed',
    'delete-user',
    'contribution-changed',
  ],
  setup(props, {emit}) {
    const toggleExpanded = (userId: number) => {
      emit('toggle-expanded', userId);
    };

    const contributionChanged = (contribution: ContributionModel) => {
      emit('contribution-changed', contribution);
    }

    const userChanged = (user: UserModel) => {
      toggleExpanded(0);
      emit('user-changed', user);
    };

    const deleteUser = (user: UserModel) => {
      emit('delete-user', user);
    };

    return {
      toggleExpanded,
      userChanged,
      deleteUser,
      contributionChanged,
    };
  },
};
</script>
