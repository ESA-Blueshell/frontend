<template>
  <div>
    <p class="text-h3">
      {{ title }} ({{ users?.length }})
    </p>
    <v-list class="mt-3">
      <div
        v-for="user in users"
        :key="user.username"
      >
        <user-list-row
          :user="user"
          :expanded="expanded"
          :is-member-list="isMemberList"
          :contributions="contributions"
          @toggle-expanded="toggleExpanded"
          @contribution-changed="contributionChanged"
          @user-changed="userChanged"
          @delete-user="deleteUser"
        />
        <v-divider/>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import UserListRow from './UserListRow.vue';
import type ContributionModel from "@/models/ContributionModel";
import type UserModel from "@/models/UserModel";

export default {
  name: 'UserList',
  components: {UserListRow},
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
    isMemberList: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'toggle-expanded',
    'user-changed',
    'delete-user',
    'contribution-changed',
  ],
  setup(props, {emit}) {
    const toggleExpanded = (user: UserModel) => {
      emit('toggle-expanded', user);
    };

    const contributionChanged = (contribution: ContributionModel) => {
      emit('contribution-changed', contribution);
    }

    const userChanged = (user: UserModel) => {
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
