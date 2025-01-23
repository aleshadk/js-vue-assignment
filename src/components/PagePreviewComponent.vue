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
      v-for="item in cmsBlocksStore.blocks"
      :key="item.id"
      v-bind="item"
      :showControlPanel="focusedElementId === item.id"
      @focusChanged="handleItemFocusChanged"
      @addNewItemClicked="() => addNewBlockModalOpened = { insertAfterBlockId: item.id }"
    />
  </div>
</template>

<script setup lang="ts">
import { useCmsBlocksStore } from '@/stores/cmsBlocksStore';
import AddNewBlockModalComponent from './AddNewBlockModalComponent.vue'
import ElementCMSWrapperComponent from './elements/ElementCMSWrapper/ElementCmsWrapperComponent.vue'
import type { BlockType } from './PagePreviewModel'
import { ref } from 'vue';

const cmsBlocksStore = useCmsBlocksStore();

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
  cmsBlocksStore.addNewBlock(type, addNewBlockModalOpened.value?.insertAfterBlockId);
  addNewBlockModalOpened.value = null;
}
</script>
