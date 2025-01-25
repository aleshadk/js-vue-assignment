import { ref, type Ref } from 'vue'

export function useCmsBlockFocusChange(isDragging: Ref<boolean>) {
  const focusedBlockId = ref<string | null>(null)

  function handleBlockFocusChanged(id: string, isFocused: boolean) {
    if (isDragging.value) {
      return;
    }

    if (isFocused) {
      focusedBlockId.value = id
      return
    }
  
    if (focusedBlockId.value === id) {
      focusedBlockId.value = null
    }
  }

  return {focusedBlockId, handleBlockFocusChanged};
}
