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
      :showControlPanel="focusedBlockId === item.id"
      @focusChanged="handleBlockFocusChanged"
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
import { useCmsBlockFocusChange } from './useCmsBlockFocusChange';

const cmsBlocksStore = useCmsBlocksStore();
const {focusedBlockId, handleBlockFocusChanged} = useCmsBlockFocusChange();

const addNewBlockModalOpened = ref<{insertAfterBlockId: string} | null>(false)

function handleAddNewBlock(type: BlockType) {
  cmsBlocksStore.addNewBlock(type, addNewBlockModalOpened.value?.insertAfterBlockId);
  addNewBlockModalOpened.value = null;
}
</script>
