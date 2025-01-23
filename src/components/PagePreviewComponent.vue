<template>
  <div class="w-2xl box-border border-gray-100 border">
    <h1>Page Preview Component</h1>
    <ElementResolverComponent v-for="(item, index) in blocks" :key="index" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import ElementResolverComponent from './elements/ElementResolverComponent.vue'
import type { BlockItem } from './PagePreviewModel'
import { ref } from 'vue'

const blocks = ref<BlockItem[]>([
  {
    type: 'text',
    value: 'Hello world',
  },
  // {
  //   type: 'img',
  //   src: 'this is src',
  //   size: 'large',
  // },
])
</script>

