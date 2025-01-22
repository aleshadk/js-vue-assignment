
<template>
    <!-- TODO: how can I avoid direct props drilling? May be I can use smth like v-bind here-->
    <TextElementComponent v-if="type === 'text'" :value="props.value"/>
    <ImageElementComponent v-if="type === 'img'" :src="props.src" :size="props.size"/>
</template>

<script setup lang="ts">
  import TextElementComponent from './text-element/TextElementComponent.vue';
  import ImageElementComponent from './image-element/ImageElementComponent.vue';

  import type { BlockItem, TextBlockItem } from '@/components/PagePreviewModel';
  const props = defineProps<BlockItem>()
</script>

<style scoped></style>
