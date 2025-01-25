<template>
  <h1 class="text-2xl m-4">Landing Page Builder</h1>
  <div class="flex justify-center">
    <div class="w-2xl box-border bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-16">
      <draggable
        v-if="cmsBlocksStore.blocks.length"
        :list="cmsBlocksStore.blocks"
        item-key="id"
        ghost-class="bg-green-500"
        chosen-class="bg-blue-300"
        animation="300"
        handle=".handle"
        @start="() => (isBlockDragingInProgress = true)"
        @end="() => (isBlockDragingInProgress = false)"
      >
        <template #item="{ element }">
          <ElementCMSWrapperComponent
            :key="element.id"
            :blockModel="element"
            :showControlPanel="!isBlockDragingInProgress && focusedBlockId === element.id"
            @focusChanged="(focused) => handleBlockFocusChanged(element.id, focused)"
            @add="() => showNewBlockModal(element.id)"
            @edit="() => editBlock(element.id)"
            @dublicate="() => cmsBlocksStore.dublicateBlock(element.id)"
            @delete="() => cmsBlocksStore.deleteBlock(element.id)"
          />
        </template>
      </draggable>
      <div v-if="cmsBlocksStore.blocks.length === 0">
        <NoDataComponent @addNewBlock="showNewBlockModal" />
      </div>
    </div>
  </div>

  <a-modal :open="opened" title="Basic Modal" @cancel="hideNewBlockModal">
    <template #footer>
      <a-button key="cancel" @click="hideNewBlockModal">Cancel</a-button>
    </template>
    <AddNewBlockModalComponent @addNewBlockClicked="addNewBlock" />
  </a-modal>

  <a-drawer :open="form !== null" title="Edit block" placement="right" @close="cancelEditBlock">
    <component :is="form" />
    <template #extra>
      <a-button type="primary" @click="submitEditBlockForm">Save</a-button>
    </template>
  </a-drawer>

  <a-button
    @click="() => console.log([...cmsBlocksStore.blocks.map((x) => ({ ...x }))])"
    type="primary"
    class="fixed bottom-16 right-16"
    style="position: fixed"
    >Show data in console</a-button
  >
</template>

<script setup lang="ts">
import { useCmsBlocksStore } from '@/cms/cmsStore'
import AddNewBlockModalComponent from '../../cms/AddNewBlockModalComponent.vue'
import ElementCMSWrapperComponent from '../../cms/LandingBlockCmsWrapper.vue'
import { ref, watch } from 'vue'
import { useCmsBlockFocusChange } from './hooks/useCmsBlockFocusChange'
import draggable from 'vuedraggable'
import { useCmsLandingForm } from './hooks/useCmsLandingForm'
import { useCmsLandingNewBlockModal } from './hooks/useCmsLandingNewBlockModal'
import NoDataComponent from './components/NoDataComponent.vue'

const isBlockDragingInProgress = ref(false)
const cmsBlocksStore = useCmsBlocksStore()

watch(isBlockDragingInProgress, (value) => {
  if (!value) {
    clearFocusedBlockId();
  }
})

const { form, editBlock, cancelEditBlock, submitEditBlockForm } = useCmsLandingForm()
const { opened, showNewBlockModal, hideNewBlockModal, addNewBlock } = useCmsLandingNewBlockModal()
const { focusedBlockId, handleBlockFocusChanged, clearFocusedBlockId } = useCmsBlockFocusChange(isBlockDragingInProgress)
</script>
