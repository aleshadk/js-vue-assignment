<template>
  <div
    class="wrapper"
    :class="{ shadowed: isActive }"
    @mouseover="handleElementMouseOver"
    @mouseout="handleElementMouseOut"
  >
    <!-- TODO: how can I avoid direct props drilling? May be I can use smth like v-bind here-->
    <TextElementComponent v-if="type === 'text'" :value="props.value" />
    <ImageElementComponent v-if="type === 'img'" :src="props.src" :size="props.size" />

    <div
      class="control-panel"
      v-if="isActive"
      @mouseover="handleControlPanelMouseOver"
      @mouseout="handleControlPanelMouseOut"
    >
      <CmsNewItemControl />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextElementComponent from './../text-element/TextElementComponent.vue'
import ImageElementComponent from './../image-element/ImageElementComponent.vue'
import type { BlockItem } from '@/components/PagePreviewModel'
import CmsNewItemControl from '../../cms-controls/CmsControlPanel.vue'
import { useControlPanelHoverLogic } from './hooks/useControlPanelHoverLogic'

const {
  isActive,
  handleElementMouseOver,
  handleElementMouseOut,
  handleControlPanelMouseOver,
  handleControlPanelMouseOut,
} = useControlPanelHoverLogic()
const props = defineProps<BlockItem>()
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
}
</style>
