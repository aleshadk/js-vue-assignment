<template>
  <img :src="props.model.src" :alt="props.model.alt" />
</template>

<script setup lang="ts">
  import type { ImageBlockModel } from '@/landing/landingBlock.model';
  const props = defineProps<{model: ImageBlockModel}>()
</script>

<style scoped></style>
