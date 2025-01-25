import { useCmsBlocksStore } from './../../../cms/cmsStore';
import type { BlockType } from '@/landing/landingBlock.model';
import { computed, ref } from 'vue';

export function useCmsLandingNewBlockModal() {
  const cmsBlocksStore = useCmsBlocksStore();
  const insertNewBlockAfter = ref<{ blockId: string | undefined } | null>(null);

  return {
    opened: computed(() => insertNewBlockAfter.value !== null),
    showNewBlockModal(showAfterBlockId?: string) {
      insertNewBlockAfter.value = { blockId: showAfterBlockId };
    },
    addNewBlock: (type: BlockType) => {
      cmsBlocksStore.addNewBlock(type, insertNewBlockAfter.value?.blockId)
      insertNewBlockAfter.value = null
    },
    hideNewBlockModal() {
      insertNewBlockAfter.value = null;
    }
  }
}