<template>
  <div>
    <strong>Contribution</strong><br>

    <!-- Loading State -->
    <div v-if="loading">
      Loading contribution information...
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-error"
    >
      Error fetching contribution information: {{ error }}
    </div>

    <!-- Display Contribution Information -->
    <div v-else>
      <p v-if="$props.isForm">
        The undersigned understands that they will need to pay the {{ formatPeriod(contributionPeriod) }} contribution
        fee,
        for which they will receive payment information by email.
      </p>
      <p>
        The membership fees for the academic year
        {{ formatPeriod(contributionPeriod) }} are:
      </p>
      <ul>
        <li><b>{{ formatCurrency(contributionPeriod.fullYearFee) }}</b> for a full year membership</li>
        <li><b>{{ formatCurrency(contributionPeriod.halfYearFee) }}</b> for a half-year membership*</li>
        <li><b>{{ formatCurrency(contributionPeriod.alumniFee) }}</b> for an Alumni membership</li>
      </ul>
      <p class="text-body-1">
        <br>
        <span v-if="!currentPeriod">
          <strong>
            *The prices shown are for the previous year and are subject to change for the coming year at the
            General Members Meeting in September
          </strong>
          <br><br>
        </span>
        <span><strong>*A half-year membership can only be obtained between the months of February and July.</strong></span>
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useStore} from 'vuex';
import axios from 'axios';
import {$handleNetworkError} from "@/plugins/handleNetworkError";
import { DateTime, Interval } from 'luxon';

// Initialize Vuex store
const store = useStore();

// Accessing the login token from Vuex store using a computed property
const loginToken = computed(() => store.getters.getLogin.token);

// Reactive variables
const contributionPeriod = ref(null); // Initialize as null
const currentPeriod = ref(false);
const loading = ref(true); // Loading state
const error = ref(null); // Error state

// Number formatter for Euro currency
const euros = new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'});

// Function to format the period
const formatPeriod = (period) => {
  if (!period || !period.startDate || !period.endDate) return 'N/A';
  const start = DateTime.fromISO(period.startDate).toFormat('yyyy');
  const end = DateTime.fromISO(period.endDate).toFormat('yyyy');
  return currentPeriod.value ? `${start}/${end}` : `${start}/${end}*`;
};


// Function to format currency
const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '€0.00';
  return euros.format(amount);
};

// Function to fetch the current contribution period
const getContributionPeriod = async () => {
  try {
    const response = await axios.get('/contributionPeriods');

    // Ensure response.data is an array
    const periods = response.data;
    if (!Array.isArray(periods)) {
      throw new Error('Invalid data format for contribution periods.');
    }

    // Find the current period where today's date is between startDate and endDate (inclusive)
    const now = DateTime.now();
    const current = periods.find(period => {
      const start = DateTime.fromISO(period.startDate);
      const end = DateTime.fromISO(period.endDate);
      return Interval.fromDateTimes(start, end).contains(now);
    });

    if (current) {
      contributionPeriod.value = current;
      currentPeriod.value = true;
    } else if (periods.length > 0) {
      // If no current period, use the latest period (assuming the last in the array is the latest)
      contributionPeriod.value = periods.at(-1); // ES2022 method
      currentPeriod.value = false;
    } else {
      // No periods available
      contributionPeriod.value = null;
      currentPeriod.value = false;
    }
  } catch (err) {
    // Capture and set error message
    error.value = err.response?.data?.message || err.message || 'Unknown error occurred.';
    $handleNetworkError(err);
  } finally {
    // Update loading state
    loading.value = false;
  }
};

// Fetch the current contribution period on component mount
onMounted(() => {
  getContributionPeriod();
});
</script>
<script>
export default {
  name: 'Contribution',
  props: {
    isForm: {
      type: Boolean,
      defaultValue: false,
    }
  }
}
</script>
<style scoped>
</style>
