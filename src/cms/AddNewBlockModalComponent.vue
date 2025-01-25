<template>
  <div class="flex gap-4">
    <a-card
      v-for="(item, index) in items"
      :key="index"
      @click="() => emit('addNewBlockClicked', item.type)"
      hoverable
      style="width: 120px"
    >
      <template #cover>
        <img alt="example" :src="item.img" />
        <p class="my-2 text-center">{{ item.text }}</p>
      </template>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import type { BlockType } from '../landing/landingBlock.model'

const items: { img: string; text: string; type: BlockType }[] = [
  { img: '/text.png', text: 'Text', type: 'text' },
  { img: '/image.png', text: 'Image', type: 'img' },
]

const emit = defineEmits<{
  (e: 'addNewBlockClicked', type: BlockType): void
}>()
</script>
