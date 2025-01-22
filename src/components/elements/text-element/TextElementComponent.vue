<template>
  <p>{{ props.value }}</p>
</template>

<script setup lang="ts">
  import type { TextBlockItem } from '@/components/PagePreviewModel';
  const props = defineProps<Omit<TextBlockItem, 'type'>>()
</script>

<style scoped></style>
