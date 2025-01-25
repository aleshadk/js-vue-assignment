import { resolveFormComponent } from '@/cms/cmsBlockResolver';
import { useCmsBlocksStore, useCmsFormStore } from '@/cms/cmsStore';
import { ref, type VNode } from 'vue';

export function useCmsLandingForm() {
  const cmsFormStore = useCmsFormStore();
  const cmsBlocksStore = useCmsBlocksStore();
  const activeEditForm = ref<VNode | null>(null)


  function cancelEditBlock() {
    activeEditForm.value = null
    cmsFormStore.updateSubmitActiveForm(null)
  }

  return {
    form: activeEditForm,
    editBlock: (id: string) => {
      const block = cmsBlocksStore.blocks.find((item) => item.id === id)
      if (!block) {
        return
      }
    
      const formComponent = resolveFormComponent(block)
      activeEditForm.value = formComponent
    },
    submitEditBlockForm: () => {
      if (!cmsFormStore.getActiveFormValue) {
        cancelEditBlock()
        return
      }

      const model = cmsFormStore.getActiveFormValue()
      cmsBlocksStore.updateBlock(model)
      cancelEditBlock()
    },
    cancelEditBlock
  }
}