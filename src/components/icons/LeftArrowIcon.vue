<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="height"
    :width="width"
    viewBox="0 0 320 512"
  >
    <path
      opacity="1"
      :fill="fill"
      d="M34.5 239L228.9 44.7c9.4-9.4 24.6-9.4 33.9 0l22.7 22.7c9.4 9.4 9.4 24.5 0 33.9L131.5 256l154 154.8c9.3 9.4 9.3 24.5 0 33.9l-22.7 22.7c-9.4 9.4-24.6 9.4-33.9 0L34.5 273c-9.4-9.4-9.4-24.6 0-33.9z"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  height: {
    default: "30",
  },
  width: {
    default: "30",
  },
  fill: {
    default: "#1E3050",
  },
});
</script>

<style lang="scss" scoped></style>
