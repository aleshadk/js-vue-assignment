import type { BlockItem } from '@/components/PagePreviewModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCMSBlocksStore = defineStore('cms-blocks', () => {
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

  function add()

  return { blocks, increment }

})

