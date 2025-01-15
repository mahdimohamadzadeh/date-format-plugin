<script setup lang="ts">
const func = (dateParts) => {
  const retval = `${dateParts.year}`;
  return retval;
};
</script>
<template>
  <span
    v-format-date="{
      date: '2024-12-22T05:30:00.000Z',
      options: {
        format: (dateParts) => {
          const retval = `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute}`;
          return retval;
        },
      },
    }"
  ></span>
</template>
