import { createCmsBlockModel } from '@/cms/cmsBlockResolver'
import type { BlockItem, BlockType } from '@/components/PagePreviewModel'
import { arrayInsertAfter } from '@/utils/arrayInsertAfter'
import { defineStore } from 'pinia'
import { ref } from 'vue'


// TODO: CMS always small or big
export const useCmsBlocksStore = defineStore('cms-blocks', () => {
  const blocks = ref<BlockItem[]>([{
    id: 'first',
    type: 'text',
    value: 'Hello world',
    aligment: 'center'
},
  {
    id: 'second',
    type: 'img',
    src: '/couple.png',
    alt: 'this is alt',
  }])

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

  return { blocks, addNewBlock, updateBlock, deleteBlock }
})

// TODO: I don't like "active" in var names
export const useCmsFormStore = defineStore('cms-form', () => {
  const submitActiveForm = ref<(() => BlockItem) | null>();

  function updateSubmitActiveForm(fn: (() => BlockItem) | null) {
    submitActiveForm.value = fn;
  }

  return { submitActiveForm, updateSubmitActiveForm }
})
