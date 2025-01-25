import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useCmsBlocksStore } from './cmsStore';
import type { LandingBlockModel } from '@/landing/landingBlock.model';

describe('cmsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('updateBlock', () => {
    it('should not modify array when updating non-existent block', () => {
      const store = useCmsBlocksStore();
      const initialBlock: LandingBlockModel = {
        id: '1',
        type: 'text',
        value: 'Initial text',
        aligment: 'left'
      };
      store.blocks = [initialBlock];

      const nonExistentBlock: LandingBlockModel = {
        id: 'non-existent',
        type: 'text',
        value: 'New text',
        aligment: 'center'
      };

      store.updateBlock(nonExistentBlock);

      expect(store.blocks).toHaveLength(1);
      expect(store.blocks[0]).toEqual(initialBlock);
    });
  });
});
