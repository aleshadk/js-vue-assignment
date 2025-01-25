import { ref, computed } from 'vue'

export function useLandingBLockHover() {
  const elHovered = ref(false)
  const controlPanelHovered = ref(false)

  const isActive = computed(() => elHovered.value || controlPanelHovered.value)

  function handleElementMouseEnter() {
    elHovered.value = true
  }

  function handleElementMouseLeave() {
    // Small delay to ensure control panel hover is registered if mouse moved there
    setTimeout(() => {
      if (!controlPanelHovered.value) {
        elHovered.value = false
      }
    }, 50)
  }

  function handleControlPanelMouseEnter() {
    controlPanelHovered.value = true
  }

  function handleControlPanelMouseLeave() {
    controlPanelHovered.value = false
    // Check if mouse is still over main element
    if (!elHovered.value) {
      reset()
    }
  }

  function reset() {
    elHovered.value = false
    controlPanelHovered.value = false
  }

  return {
    isActive,
    handleElementMouseEnter,
    handleElementMouseLeave,
    handleControlPanelMouseEnter,
    handleControlPanelMouseLeave,
    reset
  }
}
