import { createCmsBlockModel } from '@/cms/cmsBlockResolver'
import type { LandingBlockModel, BlockType } from '@/landing/landingBlock.model'
import { dublicateArrayElement } from '@/utils/arrayDublicate'
import { arrayInsertAfter } from '@/utils/arrayInsertAfter'
import { generateId } from '@/utils/generateRandomId'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useCmsBlocksStore = defineStore('cms-blocks', () => {
  const blocks = ref<LandingBlockModel[]>([]);

  function addNewBlock(type: BlockType, insertAfterBlockId?: string) {
    const result = arrayInsertAfter(blocks.value, createCmsBlockModel(type), insertAfterBlockId ? item => item.id === insertAfterBlockId : undefined)
    blocks.value = result;
  }

  // TODO: write tests for cases when there is no block with relevant id
  function updateBlock(data: LandingBlockModel) {
    blocks.value = blocks.value.map(item => item.id === data.id ? data : item);
  }

  function deleteBlock(blockId: string) {
    blocks.value = blocks.value.filter(x => x.id !== blockId);
  }

  function dublicateBlock(blockId: string) {
    blocks.value = dublicateArrayElement(blocks.value, block => ({ ...block, id: generateId() }), block => block.id === blockId);
  }

  return { blocks, addNewBlock, updateBlock, deleteBlock, dublicateBlock }
})

export const useCmsFormStore = defineStore('cms-form', () => {
  const getActiveFormValue = ref<(() => LandingBlockModel) | null>();

  function updateActiveFormGetter(fn: (() => LandingBlockModel) | null) {
    getActiveFormValue.value = fn;
  }

  return { getActiveFormValue, updateSubmitActiveForm: updateActiveFormGetter }
})
