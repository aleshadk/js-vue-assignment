<template>

  <p>This is image element: {{ props.src }} with size {{ props.size }}</p>
</template>

<script setup lang="ts">
  import type { ImageBlockItem } from '@/components/PagePreviewModel';
  const props = defineProps<ImageBlockItem>()
</script>

<style scoped></style>
