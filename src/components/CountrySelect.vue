<!-- CountrySelector.vue -->
<template>
  <div>
    <label for="country-select">Select a Country:</label>
    <select
      id="country-select"
      v-model="selectedCountry"
      @change="onSelect"
    >
      <option
        value=""
        disabled
      >
        Select a country
      </option>
      <option
        v-for="(country, code) in countries"
        :key="code"
        :value="code"
      >
        {{ getEmojiFlag(code) }} {{ country.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {countries, getEmojiFlag} from 'countries-list';

const selectedCountry = ref<string | null>(null);

const onSelect = () => {
  console.log('Selected country code:', selectedCountry.value);
};

defineProps<{ modelValue?: string }>();
defineEmits(['update:modelValue']);
</script>
