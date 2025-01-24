<template>
  <h1 class="text-2xl m-4">Page Preview Component</h1>
  <div class="flex justify-center">
    <div class="w-2xl box-border bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-16">
      <draggable
        :list="cmsBlocksStore.blocks"
        item-key="id"
        ghost-class="bg-green-500"
        chosen-class="bg-blue-300"
        animation="300"
        handle=".handle"
        @start="() => (drag = true)"
        @end="() => (drag = false)"
      >
        <template #item="{ element }">
          <ElementCMSWrapperComponent
            :key="element.id"
            :blockModel="element"
            :showControlPanel="!drag && focusedBlockId === element.id"
            @focusChanged="handleBlockFocusChanged"
            @add="() => (addNewBlockModalOpened = { insertAfterBlockId: element.id })"
            @edit="() => editCmsBlock(element.id)"
            @delete="() => cmsBlocksStore.deleteBlock(element.id)"
          />
        </template>
      </draggable>
    </div>
  </div>

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

  <a-drawer
    :open="drawerInnerNode !== null"
    title="Edit block"
    placement="right"
    @close="closeSidePanel"
  >
    <component :is="drawerInnerNode" />
    <template #extra>
      <a-button type="primary" @click="submitForm">Save</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { useCmsBlocksStore, useCmsFormStore } from '@/stores/cmsBlocksStore'
import AddNewBlockModalComponent from './AddNewBlockModalComponent.vue'
import ElementCMSWrapperComponent from './elements/ElementCMSWrapper/ElementCmsWrapperComponent.vue'
import type { BlockType } from './PagePreviewModel'
import { ref, type VNode } from 'vue'
import { useCmsBlockFocusChange } from './useCmsBlockFocusChange'
import { resolveFormComponent } from '@/cms/cmsBlockResolver'
import draggable from 'vuedraggable'

// Определяем реактивное состояние
const drag = ref(false)

const cmsBlocksStore = useCmsBlocksStore()

// TODO: rename
const drawerInnerNode = ref<VNode | null>(null)

const cmsFormStore = useCmsFormStore()

function submitForm() {
  if (!cmsFormStore.submitActiveForm) {
    closeSidePanel()
    return
  }

  const model = cmsFormStore.submitActiveForm()
  cmsBlocksStore.updateBlock(model)
  closeSidePanel()
}

function closeSidePanel() {
  drawerInnerNode.value = null
  cmsFormStore.updateSubmitActiveForm(null)
}

const editCmsBlock = (id: string) => {
  const block = cmsBlocksStore.blocks.find((item) => item.id === id)
  if (!block) {
    return
  }

  const formComponent = resolveFormComponent(block)
  drawerInnerNode.value = formComponent
}

const { focusedBlockId, handleBlockFocusChanged } = useCmsBlockFocusChange(drag)

const addNewBlockModalOpened = ref<{ insertAfterBlockId: string } | null>(null)

function handleAddNewBlock(type: BlockType) {
  cmsBlocksStore.addNewBlock(type, addNewBlockModalOpened.value?.insertAfterBlockId)
  addNewBlockModalOpened.value = null
}
</script>
