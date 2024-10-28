<template>
  <v-main>
    <top-banner title="Member Manager" />

    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 1000px"
      >
        <contribution-period-list @contributions-changed="contributionsChanged" />

        <v-text-field
          v-model="search"
          label="Search for a user"
        />

        <user-list
          title="Non-member users"
          :users="nonMembers"
          :expanded="expanded"
          :contributions="contributions"
          @contribution-changed="contributionChanged"
          @toggle-expanded="toggleExpanded"
          @user-changed="userChanged"
          @delete-user="deleteUser"
        />

        <user-list
          class="mt-5"
          title="Members"
          :users="members"
          :expanded="expanded"
          is-member-list
          :contributions="contributions"
          @contribution-changed="contributionChanged"
          @toggle-expanded="toggleExpanded"
          @user-changed="userChanged"
          @delete-user="deleteUser"
        />
      </div>
    </div>
  </v-main>
</template>
<script lang="ts">
import { ref, watch, onMounted, defineComponent } from 'vue';
import TopBanner from '@/components/top-banner.vue';
import ContributionPeriodList from '@/components/ContributionPeriodList.vue';
import UserList from '@/components/UserList.vue';
import UserService from "@/services/UserService";
import type ContributionModel from "@/models/ContributionModel";
import type UserModel from "@/models/UserModel";

export default defineComponent({
  name: 'MemberManager',
  components: {
    TopBanner,
    ContributionPeriodList,
    UserList,
  },
  setup() {
    const members = ref([] as UserModel[]);
    const nonMembers = ref([] as UserModel[]);
    const users = ref([] as UserModel[]);
    const contributions = ref([] as ContributionModel[]);
    const expanded = ref(0);
    const search = ref('');
    const userService = new UserService();

    const getUsers = async () => {
      users.value = await userService.getUsers();
      updateMembers();
    };

    const isSearched = (user: UserModel) => {
      return (user.fullName + user.username).toLowerCase().includes(search.value.toLowerCase());
    };

    const updateMembers = () => {
      members.value = users.value.filter((user) => user.roles.includes('MEMBER') && isSearched(user));
      nonMembers.value = users.value.filter((user) => !user.roles.includes('MEMBER') && isSearched(user));
    };

    watch(search, () => {
      updateMembers();
    });

    const deleteUser = (user: UserModel) => {
      users.value = users.value.filter((u) => u.id !== user.id);
      updateMembers();
    };

    const toggleExpanded = (user: UserModel) => {
      expanded.value = user.id === expanded.value ? 0 : user.id as number;
    };

    const userChanged = (user: UserModel) => {
      const index = users.value.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users.value.splice(index, 1, user);
        updateMembers();
      }
    };

    const contributionsChanged = (newContributions: ContributionModel[]) => {
      contributions.value = newContributions;
    };

    const contributionChanged = (updatedContribution: ContributionModel) => {
      const index = contributions.value.findIndex((c) => c.id === updatedContribution.id);
      console.error('contribution changed',updatedContribution);
      if (index !== -1) {
        contributions.value.splice(index, 1, updatedContribution);
      }
    };

    onMounted(() => {
      getUsers();
    });

    return {
      members,
      nonMembers,
      contributions,
      expanded,
      search,
      deleteUser,
      toggleExpanded,
      userChanged,
      contributionsChanged,
      contributionChanged,
    };
  },
});
</script>

<style scoped>
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
