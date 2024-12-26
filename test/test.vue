<script setup lang="ts">

</script>
<template>
  <span
    v-format-date="{
      date: '2024-12-22T05:30:00.000Z',
      options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        formatMatcher: 'basic',
      },
    }"
  ></span>
</template>
