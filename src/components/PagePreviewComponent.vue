<template>
  <div class="w-2xl box-border border-gray-100 border">
    <h1>Page Preview Component</h1>
    <ElementCMSWrapperComponent v-for="(item, index) in blocks" :key="index" v-bind="item" :showControlPanel="focusedElementId === item.id" @focusChanged="handleItemFocusChanged" />
  </div>
</template>

<script setup lang="ts">
import ElementCMSWrapperComponent from './elements/ElementCMSWrapper/ElementCmsWrapperComponent.vue'
import type { BlockItem } from './PagePreviewModel'
import { ref } from 'vue'

const focusedElementId = ref<string | null>(null);

function handleItemFocusChanged(id: string, isFocused: boolean) {
  if (isFocused) {
    focusedElementId.value = id;
    return;
  }

  if (focusedElementId.value === id) {
    focusedElementId.value = null;
  } 
}

const blocks = ref<BlockItem[]>([
  {
    id: 'first',
    type: 'text',
    value: 'Hello world',
  },
  {
    id: 'second',
    type: 'img',
    src: 'this is src',
    size: 'large',
  },
])
</script>

