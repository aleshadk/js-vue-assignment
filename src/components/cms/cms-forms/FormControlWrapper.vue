<template>
  <div>
    <p class="mb-1">{{ label }}</p>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ label: string }>()
</script>
