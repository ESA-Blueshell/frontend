<template>
  <v-main>
    <top-banner title="Activate Account" />

    <div class="mx-3">
      <div
        class="mx-auto mt-10"
        style="max-width: 500px"
      >
        <div v-if="!succeeded">
          <p>
            Please set your username and password to activate your account.
          </p>
          <v-form
            ref="formRef"
            v-model="valid"
          >
            <v-text-field
              v-model="form.username"
              :rules="usernameRules"
              label="Username"
              :disabled="!isMember"
            />
            <v-text-field
              v-model="form.password"
              :rules="passwordRules"
              label="Password"
              :v-if="isMember"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
            />
            <v-text-field
              v-model="form.passwordAgain"
              :rules="passwordAgainRules"
              label="Repeat Password"
              :v-if="isMember"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
            />
            <v-row>
              <v-spacer />
              <v-col cols="auto">
                <v-btn
                  :disabled="!valid"
                  :loading="loading"
                  color="primary"
                  @click="activateAccount"
                >
                  Activate Account
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
        <div v-else>
          <p class="text-center text-subtitle-1 font-weight-light">
            Your account has been activated successfully! You can now log in.
          </p>
        </div>
      </div>
    </div>
  </v-main>
</template>
<script lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import TopBanner from '@/components/top-banner';
import UserService from '@/services/UserService';
import type {VForm} from 'vuetify/components';
import {AxiosError} from 'axios';
import store from "@/plugins/store";

export default {
  components: {TopBanner},
  setup() {
    // Reactive form data
    const form = ref({
      username: '',
      password: '',
      passwordAgain: '',
    });

    const valid = ref(false);
    const userService = new UserService();
    const succeeded = ref(false);
    const loading = ref(false);
    const showPass = ref(false);
    const token = ref('');
    const username = ref('');
    const isMember = ref(false);
    const formRef = ref<VForm>();

    // Validation rules
    const usernameRules = [
      (v: string) => isMember.value || !!v || 'Username is required',
      (v: string) =>
        isMember.value ||
        /^[a-zA-Z0-9]+$/.test(v) ||
        'Username must only contain alphanumeric characters',
    ];

    const passwordRules = [
      (v: string) => !!v || 'Password is required',
      (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
    ];

    const passwordAgainRules = computed(() => [
      (v: string) => !!v || 'Repeat password is required',
      (v: string) => v === form.value.password || 'Passwords must match',
    ]);

    // Accessing route and router
    const route = useRoute();
    const router = useRouter();


    // Lifecycle hook to get the token from query params
    onMounted(() => {
      token.value = route.query.token as string;
      if (!token.value) {
        router.push('/');
      }
      isMember.value = !username.value;
    });

    // Method to activate account
    const activateAccount = async () => {
      const isValid = await formRef.value?.validate();

      if (!isValid) {
        return;
      }

      loading.value = true;
      let request;
      if (isMember.value) {
        request = userService.activateMember(
          {
            username: form.value.username,
            password: form.value.password,
            token: token.value
          }
        )
      } else {
        request = userService.activateUser(
          {
            username: form.value.username,
            token: token.value,
          }
        )
      }


      request.then(() => {
        succeeded.value = true;
      }).finally(() => {
        loading.value = false;
      });
    };

    return {
      form,
      valid,
      succeeded,
      loading,
      showPass,
      token,
      usernameRules,
      passwordRules,
      passwordAgainRules,
      activateAccount,
      formRef,
      isMember,
    };
  },
};
</script>
