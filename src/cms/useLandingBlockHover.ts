import { ref, computed } from 'vue'

export function useLandingBLockHover() {
  const elHovered = ref(false);
  const controlPanelHovered = ref(false);

  const isActive = computed(() => elHovered.value || controlPanelHovered.value)

  function handleElementMouseOver() {
    elHovered.value = true;
  }

  function handleElementMouseOut(event: MouseEvent) {
    const target = event.relatedTarget as Element;

    if (!target || !target.closest('.wrapper')) {
      elHovered.value = false;
    }
  }

  function handleControlPanelMouseOver() {
    controlPanelHovered.value = true;
  }

  function handleControlPanelMouseOut() {
    controlPanelHovered.value = false;
  }

  function reset() {
    elHovered.value = false;
    controlPanelHovered.value = false;
  }

  return {
    isActive,
    handleElementMouseOver,
    handleElementMouseOut,
    handleControlPanelMouseOver,
    handleControlPanelMouseOut,
    reset
  }
}
