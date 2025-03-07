<script setup lang="ts">
import { DatePartType } from '../src/main';

const func = (dateParts: DatePartType) => {
  const retval = `${dateParts.year}`;
  return retval;
};
</script>
<template>
  <span
    v-format-date="{
      date: '2024-12-22T05:30:00.000Z',
      options: {
        format: (value: DatePartType) => {
          return `${value.year}-${value.month}-${value.day}`;
        },
      },
    }"
  ></span>
</template>
