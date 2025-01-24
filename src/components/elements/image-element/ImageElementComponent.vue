<template>

  <p>This is image element: {{ props.model.src }} with alt {{ props.model.alt }}</p>
</template>

<script setup lang="ts">
  import type { ImageBlockItem } from '@/components/PagePreviewModel';
  const props = defineProps<{model: ImageBlockItem}>()
</script>

<style scoped></style>
