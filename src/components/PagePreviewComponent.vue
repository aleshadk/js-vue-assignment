<template>
  <div class="w-2xl box-border border-gray-100 border">
    <h1>Page Preview Component</h1>
    <a-modal
      :open="addNewBlockModalOpened"
      title="Basic Modal"
      @cancel="addNewBlockModalOpened = null"
    >
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
      @add="() => (addNewBlockModalOpened = { insertAfterBlockId: item.id })"
      @edit="() => editCmsBlock(item.id)"
    />

    <a-drawer
      v-model:open="drawerInnerNode"
      title="Edit block"
      placement="right"
    >
      <component :is="drawerInnerNode" />
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { useCmsBlocksStore } from '@/stores/cmsBlocksStore'
import AddNewBlockModalComponent from './AddNewBlockModalComponent.vue'
import ElementCMSWrapperComponent from './elements/ElementCMSWrapper/ElementCmsWrapperComponent.vue'
import type { BlockType } from './PagePreviewModel'
import { ref, type VNode } from 'vue'
import { useCmsBlockFocusChange } from './useCmsBlockFocusChange'
import { resolveFormComponent } from '@/cms/cmsBlockResolver'

// TODO: rename
const drawerInnerNode = ref<VNode | null>(null);

const editCmsBlock = (id: string) => {
  const block = cmsBlocksStore.blocks.find(item => item.id === id);
  if (!block) {
    return;
  }

  const formComponent = resolveFormComponent(block);
  drawerInnerNode.value = formComponent;
}

const cmsBlocksStore = useCmsBlocksStore()
const { focusedBlockId, handleBlockFocusChanged } = useCmsBlockFocusChange()

const addNewBlockModalOpened = ref<{ insertAfterBlockId: string } | null>(null);

function handleAddNewBlock(type: BlockType) {
  cmsBlocksStore.addNewBlock(type, addNewBlockModalOpened.value?.insertAfterBlockId)
  addNewBlockModalOpened.value = null
}
</script>
