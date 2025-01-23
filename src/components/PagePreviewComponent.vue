<template>
  <div class="w-2xl box-border border-gray-100 border">
    <h1>Page Preview Component</h1>
    <a-modal :open="addNewBlockModalOpened" title="Basic Modal" @cancel="addNewBlockModalOpened = null">
      <template #footer>
        <a-button key="cancel" @click="addNewBlockModalOpened = null">Cancel</a-button>
      </template>
      <AddNewBlockModalComponent @addNewBlockClicked="handleAddNewBlock" />
    </a-modal>
    <!-- <AddNewBlockModalComponent :open="addNewBlockModalOpened" /> -->
    <ElementCMSWrapperComponent
      v-for="(item, index) in blocks"
      :key="index"
      v-bind="item"
      :showControlPanel="focusedElementId === item.id"
      @focusChanged="handleItemFocusChanged"
      @addNewItemClicked="() => addNewBlockModalOpened = { insertAfterBlockId: item.id }"
    />
  </div>
</template>

<script setup lang="ts">
import AddNewBlockModalComponent from './AddNewBlockModalComponent.vue'
import ElementCMSWrapperComponent from './elements/ElementCMSWrapper/ElementCmsWrapperComponent.vue'
import type { BlockItem, BlockType } from './PagePreviewModel'
import { ref } from 'vue'

const addNewBlockModalOpened = ref<{insertAfterBlockId: string} | null>(false)

const focusedElementId = ref<string | null>(null)

function handleItemFocusChanged(id: string, isFocused: boolean) {
  if (isFocused) {
    focusedElementId.value = id
    return
  }

  if (focusedElementId.value === id) {
    focusedElementId.value = null
  }
}

function handleAddNewBlock(type: BlockType) {
  console.log(type, addNewBlockModalOpened.value?.insertAfterBlockId);
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
