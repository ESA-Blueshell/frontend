<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="userData.username"
        disabled
        label="Username"
      />
      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="userData.prefix"
            :disabled="disableEdit"
            label="Prefix"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="userData.initials"
            :disabled="disableEdit"
            label="Initials"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="userData.firstName"
            :disabled="disableEdit"
            label="First Name"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="userData.lastName"
            :disabled="disableEdit"
            label="Last Name"
          />
        </v-col>
      </v-row>

      <v-text-field
        v-model="userData.email"
        :disabled="disableEdit"
        label="E-mail"
      />
      <v-text-field
        v-model="userData.address"
        :disabled="disableEdit"
        label="Address"
      />
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="userData.city"
            :disabled="disableEdit"
            label="City"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="userData.postalCode"
            :disabled="disableEdit"
            label="Postal Code"
          />
        </v-col>
      </v-row>
      <v-phone-input
        v-model="userData.phoneNumber"
        label="Phone Number"
        :mode="'international'"
        :default-country="'nl'"
        placeholder="Phone Number"
        :disabled="disableEdit"
      />
      <v-text-field
        v-model="userData.studentNumber"
        label="Student Number"
        :disabled="disableEdit"
      />
      <v-text-field
        v-model="userData.dateOfBirth"
        label="Date of Birth"
        type="date"
        :disabled="disableEdit"
      />
      <v-text-field
        v-model="userData.discord"
        label="Discord Username"
        :disabled="disableEdit"
      />
      <v-row>
        <v-col>
          <v-checkbox
            v-model="userData.newsletter"
            label="Subscribe to newsletter"
            :disabled="disableEdit"
          />
        </v-col>
      </v-row>
      <!-- Save Button -->
      <v-row>
        <v-spacer />
        <v-col cols="auto">
          <v-tooltip
            location="top"
            text="Save changes"
          >
            <template #activator="{ props }">
              <v-btn
                icon="mdi-content-save"
                :disabled="!valid || disableEdit"
                :loading="submitting"
                v-bind="props"
                @click="save"
              />
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { VPhoneInput } from 'v-phone-input';
import moment from 'moment';
import store from '@/plugins/store';
import type UserModel from "@/models/UserModel";
import UserService from "@/services/UserService";
import type {VForm} from "vuetify/components";
import {AxiosError} from "axios";

export default {
  name: 'UserComponent',
  components: { VPhoneInput },
  props: {
    user: {
      type: Object as () => UserModel,
      required: true,
    },
  },
  emits: [
    'user-changed',
  ],
  setup(props, { emit }) {
    const roles = store.getters.getLogin?.roles;
    const disableEdit = !roles || !(roles.includes('BOARD') || roles.includes('ADMIN'))
    const userService = new UserService();
    // Type the userData as a reactive object based on the UserModel interface
    const userData = ref(props.user as UserModel);

    const valid = ref(true);
    const submitting = ref(false);
    const form = ref<VForm>();

    onMounted(() => {
      if (userData.value.dateOfBirth) {
        userData.value.dateOfBirth = moment(userData.value.dateOfBirth).format('YYYY-MM-DD');
      }
    });

    const save = async () => {
      const isValid = await form.value?.validate();
      if (!isValid) {
        return;
      }

      submitting.value = true;

      // Send updated user data to backend
      try {
        const user: UserModel = await userService.update(userData.value);
        submitting.value = false;
        emit('user-changed', user);
      } catch (e: unknown) {
        submitting.value = false;
        if (e instanceof AxiosError && e.response?.status === 400) {
          store.commit('setStatusSnackbarMessage', e.response.data);
        }
      }
    };

    return {
      disableEdit,
      userData,
      valid,
      submitting,
      form,
      save,
    };
  },
};
</script>

<style scoped>
.v-col:first-child {
  padding-left: 0;
}
.v-col:last-child {
  padding-right: 0;
}
</style>
