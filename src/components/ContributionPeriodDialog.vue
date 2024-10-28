<template>
  <v-dialog
    v-model="showDialog"
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
                v-model="form.startDate"
                label="Start Date"
                :rules="startDateRules"
                type="date"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.endDate"
                label="End Date"
                :rules="endDateRules"
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
        <v-spacer />
        <v-btn
          v-if="isEditing"
          color="red"
          @click="confirmDeletePeriod"
        >
          Delete
        </v-btn>
        <v-btn
          color="primary"
          @click="saveContributionPeriod"
        >
          {{ isEditing ? 'Save' : 'Create' }}
        </v-btn>
        <v-btn @click="closeDialog">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  computed,
  defineComponent,
  getCurrentInstance,
  toRefs,
} from 'vue';
import { useStore } from 'vuex';
import { $handleNetworkError } from '@/plugins/handleNetworkError';
import moment from 'moment';
import type ContributionPeriodModel from '@/models/ContributionPeriodModel';

export default defineComponent({
  name: 'ContributionPeriodDialog',
  props: {
    modelValue: Boolean,
    isEditing: Boolean,
    selectedPeriod: Object,
    contributionPeriods: {
      type: Array as () => ContributionPeriodModel[],
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'refresh-periods', 'delete'],
  setup(props, { emit }) {
    const showDialog = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const form = reactive({
      startDate: '',
      endDate: '',
      halfYearFee: null,
      fullYearFee: null,
      alumniFee: null,
    });

    const feeRules = [
      (value) => (value !== null && value !== '') || 'Fee is required',
    ];
    const formRef = ref(null);

    const { contributionPeriods, selectedPeriod } = toRefs(props);

    const { proxy } = getCurrentInstance();
    const store = useStore();

    const startDateRules = computed(() => [
      (value) => !!value || 'Start Date is required',
      (value) => isValidStartDate(value) || 'Start date must be before end date',
      (value) =>
        startsAfterLatest(value) ||
        'The period must start after the latest contribution period',
    ]);

    const endDateRules = computed(() => [
      (value) => !!value || 'End Date is required',
      (value) => isValidEndDate(value) || 'End date must be after start date',
    ]);

    const startsAfterLatest = (startDate) => {
      if (!contributionPeriods.value || contributionPeriods.value.length === 0) {
        return true; // No periods to compare with
      }

      // Exclude the current period if editing
      const otherPeriods = contributionPeriods.value.filter(
        (period) => period.id !== selectedPeriod.value?.id
      );

      if (otherPeriods.length === 0) {
        return true;
      }

      // Find the latest end date among other periods
      const latestEndDate = otherPeriods.reduce((latest, period) => {
        const periodEndDate = moment(period.endDate);
        return periodEndDate.isAfter(latest) ? periodEndDate : latest;
      }, moment(otherPeriods[0].endDate));

      return moment(startDate).isSameOrAfter(latestEndDate);
    };

    const isValidStartDate = (startDate) => {
      if (!form.endDate) {
        return true;
      }
      return moment(startDate).isBefore(form.endDate);
    };

    const isValidEndDate = (endDate) => {
      if (!form.startDate) {
        return true;
      }
      return moment(endDate).isAfter(form.startDate);
    };

    const saveContributionPeriod = async () => {
      const { valid } = await formRef.value.validate();

      if (!valid) {
        return;
      }

      try {
        if (props.isEditing) {
          await proxy.$http.put(
            `/contributionPeriods/${props.selectedPeriod.id}`,
            form,
            {
              headers: {
                Authorization: `Bearer ${store.getters.getLogin.token}`,
              },
            }
          );
        } else {
          await proxy.$http.post('/contributionPeriods', form, {
            headers: {
              Authorization: `Bearer ${store.getters.getLogin.token}`,
            },
          });
        }
        emit('refresh-periods');
        closeDialog();
      } catch (e) {
        $handleNetworkError(e);
      }
    };

    const closeDialog = () => {
      emit('update:modelValue', false);
      resetForm();
    };

    const resetForm = () => {
      form.startDate = '';
      form.endDate = '';
      form.halfYearFee = null;
      form.fullYearFee = null;
      form.alumniFee = null;
    };

    const confirmDeletePeriod = () => {
      emit('update:modelValue', false);
      emit('delete');
    };

    return {
      showDialog,
      form,
      feeRules,
      formRef,
      startDateRules,
      endDateRules,
      saveContributionPeriod,
      closeDialog,
      confirmDeletePeriod,
    };
  },
});
</script>
<style scoped>
.v-col:first-child {
  padding-left: 0;
}
.v-col:last-child {
  padding-right: 0;
}
</style>
