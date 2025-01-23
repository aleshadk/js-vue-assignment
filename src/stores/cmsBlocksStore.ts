import { createCmsBlockModel } from '@/cms/cmsBlockResolver'
import type { BlockItem, BlockType } from '@/components/PagePreviewModel'
import { arrayInsertAfter } from '@/utils/arrayInsertAfter'
import { defineStore } from 'pinia'
import type { Block } from 'typescript'
import { ref } from 'vue'


// TODO: CMS always small or big
export const useCmsBlocksStore = defineStore('cms-blocks', () => {
  const blocks = ref<BlockItem[]>([{
    id: 'first',
    type: 'text',
    value: 'Hello world',
  },
  {
    id: 'second',
    type: 'img',
    src: 'this is src',
    size: 'large',
  }])

  function addNewBlock(type: BlockType, insertAfterBlockId?: string) {
    const result = arrayInsertAfter(blocks.value, createCmsBlockModel(type), insertAfterBlockId ? item => item.id === insertAfterBlockId : undefined)
    blocks.value = result;
  }

  return { blocks, addNewBlock }
})

