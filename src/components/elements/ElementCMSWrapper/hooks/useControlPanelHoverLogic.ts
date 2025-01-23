import { ref, computed } from 'vue'

export function useControlPanelHoverLogic() {
  const elHovered = ref(false);
  const controlPanelHovered = ref(false);

  const isActive = computed(() => elHovered.value || controlPanelHovered.value)

  function handleElementMouseOver(event: MouseEvent) {
    elHovered.value = true;
  }

  function handleElementMouseOut(event: MouseEvent) {
    if (!event.relatedTarget || !(event.relatedTarget as Element).closest('.wrapper')) {
      elHovered.value = false;
    }
  }

  function handleControlPanelMouseOver() {
    controlPanelHovered.value = true;
  }

  function handleControlPanelMouseOut() {
    controlPanelHovered.value = false;
  }

  return {
    isActive,
    handleElementMouseOver,
    handleElementMouseOut,
    handleControlPanelMouseOver,
    handleControlPanelMouseOut
  }
}
