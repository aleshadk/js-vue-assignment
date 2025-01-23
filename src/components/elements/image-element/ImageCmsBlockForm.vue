<template>
  <div>
    <a-input v-model:value="value" placeholder="Image URL" />
    <a-input v-model:value="value2" placeholder="Image alt text" />
  </div>
</template>
<script lang="ts" setup>
import type { ImageBlockItem } from '@/components/PagePreviewModel';
import { ref } from 'vue';
const value = ref<string>('');
const value2 = ref<string>('');
const props = defineProps<ImageBlockItem>();
</script>