import { ref, computed } from 'vue'

export function useCmsBlockFocusChange() {
  const focusedBlockId = ref<string | null>(null)

  function handleBlockFocusChanged(id: string, isFocused: boolean) {
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
