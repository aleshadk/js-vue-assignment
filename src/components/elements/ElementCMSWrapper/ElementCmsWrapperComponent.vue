<template>
  <div
    class="wrapper"
    :class="{ shadowed: props.showControlPanel }"
    @mouseover="handleElementMouseOver"
    @mouseout="handleElementMouseOut"
  >
    <!-- TODO: how can I avoid direct props drilling? May be I can use smth like v-bind here-->
    <!-- TODO: use kind of resolver here-->
    <TextElementComponent v-if="props.blockModel.type === 'text'" :model="props.blockModel" />
    <ImageElementComponent v-if="props.blockModel.type === 'img'" :model="props.blockModel" />

    <div
      class="control-panel"
      v-if="props.showControlPanel"
      @mouseover="handleControlPanelMouseOver"
      @mouseout="handleControlPanelMouseOut"
    >
      <CmsNewItemControl @add="() => emit('add')" @edit="() => emit('edit')" @delete="() => emit('delete')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextElementComponent from './../text-element/TextElementComponent.vue'
import ImageElementComponent from './../image-element/ImageElementComponent.vue'
import type { BlockItem } from '@/components/PagePreviewModel'
import CmsNewItemControl from '../../cms-controls/CmsControlPanel.vue'
import { useControlPanelHoverLogic } from './hooks/useControlPanelHoverLogic'
import { watch } from 'vue'
const props = defineProps<{ blockModel: BlockItem; showControlPanel: boolean }>()

const emit = defineEmits<{
  (e: 'focusChanged', id: string, isFocused: boolean): void // TODO: renove id?
  (e: 'add'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const {
  isActive,
  handleElementMouseOver,
  handleElementMouseOut,
  handleControlPanelMouseOver,
  handleControlPanelMouseOut,
  reset,
} = useControlPanelHoverLogic(props.blockModel.id)

// TODO: I don't like it, but I don't know how to fix it in a better way

watch(
  () => props.showControlPanel,
  (value) => {
    if (!value) {
      reset()
    }
  },
)

watch(isActive, (value) => emit('focusChanged', props.blockModel.id, value))

</script>
<style scoped>
.wrapper {
  position: relative;
  display: flex;
  height: auto;
}

.shadowed {
  box-shadow: 0 0 0 1px var(--color-sky-600);
  border-radius: 6px;
}

.control-panel {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 1;
}
</style>
