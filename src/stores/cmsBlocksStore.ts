import { createCmsBlockModel } from '@/cms/cmsBlockResolver'
import type { BlockItem, BlockType } from '@/components/PagePreviewModel'
import { dublicateArrayElement } from '@/utils/arrayDublicate'
import { arrayInsertAfter } from '@/utils/arrayInsertAfter'
import { generateId } from '@/utils/generateRandomId'
import { defineStore } from 'pinia'
import { ref } from 'vue'


// TODO: CMS always small or big
export const useCmsBlocksStore = defineStore('cms-blocks', () => {
  const blocks = ref<BlockItem[]>([]);

  function addNewBlock(type: BlockType, insertAfterBlockId?: string) {
    const result = arrayInsertAfter(blocks.value, createCmsBlockModel(type), insertAfterBlockId ? item => item.id === insertAfterBlockId : undefined)
    blocks.value = result;
  }

  // TODO: write tests for cases when there is no block with relevant id
  function updateBlock(data: BlockItem) {
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

// TODO: I don't like "active" in var names
export const useCmsFormStore = defineStore('cms-form', () => {
  const submitActiveForm = ref<(() => BlockItem) | null>();

  function updateSubmitActiveForm(fn: (() => BlockItem) | null) {
    submitActiveForm.value = fn;
  }

  return { submitActiveForm, updateSubmitActiveForm }
})
