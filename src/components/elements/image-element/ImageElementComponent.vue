<template>
  <img :src="props.model.src" :alt="props.model.alt" />
</template>

<script setup lang="ts">
  import type { ImageBlockItem } from '@/components/PagePreviewModel';
  const props = defineProps<{model: ImageBlockItem}>()
</script>

<style scoped></style>
