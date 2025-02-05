<template>
  <v-select
    v-model="selectedNationality"
    :items="nationalityOptions"
    label="Select a Nationality"
    :rules="[requiredRule]"
    outlined
    dense
    return-object
    clearable
  >
    <template #item="{ item, props }">
      <v-list-item
        v-bind="props"
        class="pa-2"
      >
        <v-list-item-avatar :start="true">
          {{ item.value.flag }}
        </v-list-item-avatar>
        <v-list-item-title>{{ item.value.name }}</v-list-item-title>
      </v-list-item>
    </template>

    <!-- Customize the display of the selected item -->
    <template #selection="{ item }">
      <v-chip
        class="mr-2"
        size="small"
        variant="tonal"
      >
        {{ item.value.flag }} {{ item.value.name }}
      </v-chip>
    </template>
  </v-select>
</template>

<script setup
        lang="ts"
>
import {ref, watch} from 'vue';
import {countries, getEmojiFlag, type TCountryCode} from 'countries-list';
import { getName, registerLocale } from 'i18n-nationality';
import enLocale from 'i18n-nationality/langs/en.json';
registerLocale(enLocale);

// Define the props and emits for v-model binding
const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits(['update:modelValue']);

// Reactive reference for the selected nationality
const selectedNationality = ref<string | undefined>(props.modelValue || undefined);

type NationalityOption = {
  name: string;  // The nationality name
  code: string;  // Country code
  flag: string;  // Emoji flag
};

// Generate the options for the select component
const nationalityOptions: NationalityOption[] = Object.entries(countries).map(([code]) => ({
  name: getName(code, 'en'),
  code: code,
  flag: getEmojiFlag(code as TCountryCode),
}));

console.log(`options:`, nationalityOptions)
console.log(`codes:`, nationalityOptions.map(item => item.code))
console.log(`names:`, nationalityOptions.map(item => item.name))
// Validation rule to ensure a nationality is selected
const requiredRule = (value: string) => !!value || 'Nationality is required';

// Watch for changes in the local selection and emit updates
watch(selectedNationality, (newVal) => {
  emit('update:modelValue', newVal);
});

// Watch for external changes to modelValue and update the local selection
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== selectedNationality.value) {
      selectedNationality.value = newVal;
    }
  }
);
</script>

<style scoped>
/* Optional: Customize the appearance further if needed */
</style>
